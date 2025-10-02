from datetime import datetime, timezone
from unittest.mock import MagicMock

from fastapi.testclient import TestClient

from src.main import app, orders

client = TestClient(app)


def test_orders_endpoint_cycle():
    orders.clear()

    res = client.get('/orders')
    assert res.status_code == 200
    assert res.json() == []

    payload = {"side": "buy", "amount": 1.5, "symbol": "BTC/USDT"}
    post_res = client.post('/orders', json=payload)
    assert post_res.status_code == 200
    body = post_res.json()
    assert body['success'] is True
    order_id = body['order']['id']

    res_after = client.get('/orders')
    assert res_after.status_code == 200
    data = res_after.json()
    assert len(data) == 1
    assert data[0]['id'] == order_id


def test_create_order_invalid_side():
    orders.clear()
    payload = {"side": "hold", "amount": 1, "symbol": "BTC/USDT"}
    res = client.post('/orders', json=payload)
    assert res.status_code == 422


def test_create_order_negative_amount():
    orders.clear()
    payload = {"side": "buy", "amount": -1, "symbol": "BTC/USDT"}
    res = client.post('/orders', json=payload)
    assert res.status_code == 422


def test_limit_order_requires_limit_price():
    orders.clear()
    payload = {"side": "buy", "amount": 1, "symbol": "BTC/USDT", "type": "limit"}
    res = client.post('/orders', json=payload)
    assert res.status_code == 422


def test_get_historical_prices_success(monkeypatch):
    mock_data_feed = MagicMock()
    mock_data_feed.config = {
        "default_exchange": "binance",
        "default_symbol": "BTC/USDT",
        "default_timeframe": "1h",
        "default_limit": 50,
    }

    candle_timestamp = 1625097600000
    close_price = 50500

    mock_data_feed.fetch_historical_data.return_value = [
        [candle_timestamp, 50000, 51000, 49000, close_price, 120],
    ]

    monkeypatch.setattr("src.main.data_feed", mock_data_feed)

    response = client.get("/historical-prices")
    assert response.status_code == 200

    expected_timestamp = datetime.fromtimestamp(
        candle_timestamp / 1000, tz=timezone.utc
    ).isoformat().replace("+00:00", "Z")

    assert response.json() == [
        {
            "timestamp": expected_timestamp,
            "price": close_price,
            "symbol": "BTC/USDT",
        }
    ]

    mock_data_feed.fetch_historical_data.assert_called_once_with(
        exchange_name="binance",
        symbol="BTC/USDT",
        timeframe="1h",
        limit=50,
    )


def test_get_historical_prices_missing_credentials(monkeypatch):
    mock_data_feed = MagicMock()
    mock_data_feed.config = {
        "default_exchange": "binance",
        "default_symbol": "BTC/USDT",
        "default_timeframe": "1h",
        "default_limit": 100,
    }
    mock_data_feed.fetch_historical_data.return_value = None

    monkeypatch.setattr("src.main.data_feed", mock_data_feed)

    response = client.get("/historical-prices")

    assert response.status_code == 400
    assert response.json()["detail"].startswith("Exchange credentials are missing or invalid")


def test_get_historical_prices_ccxt_error(monkeypatch):
    mock_data_feed = MagicMock()
    mock_data_feed.config = {
        "default_exchange": "binance",
        "default_symbol": "BTC/USDT",
        "default_timeframe": "1h",
        "default_limit": 100,
    }
    mock_data_feed.fetch_historical_data.side_effect = Exception("ccxt failure")

    monkeypatch.setattr("src.main.data_feed", mock_data_feed)

    response = client.get("/historical-prices")

    assert response.status_code == 502
    assert "ccxt failure" in response.json()["detail"]
