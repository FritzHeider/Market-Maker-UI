# src/tests/test_datafeed.py

import pytest
from unittest.mock import MagicMock, patch
from src.modules.datafeed.data_feed import DataFeed

# Mock configuration and secrets files
MOCK_CONFIG = {
    "default_exchange": "binance",
    "default_symbol": "BTC/USDT",
    "default_timeframe": "1h",
    "default_limit": 100
}

MOCK_SECRETS = {
    "exchanges": {
        "binance": {
            "api_key": "mock_api_key",
            "api_secret": "mock_api_secret"
        }
    }
}

@pytest.fixture
def data_feed():
    """Fixture to initialize DataFeed with mocked configurations."""
    with patch("src.modules.datafeed.data_feed.DataFeed._load_yaml") as mock_load_yaml:
        mock_load_yaml.side_effect = lambda path: MOCK_CONFIG if "config" in path else MOCK_SECRETS
        return DataFeed(config_path="mock_config.yaml", secrets_path="mock_secrets.yaml")


def test_initialize_exchanges(data_feed):
    """Test that exchanges are initialized correctly."""
    assert "binance" in data_feed.exchanges
    exchange = data_feed.exchanges["binance"]
    assert exchange.apiKey == "mock_api_key"
    assert exchange.secret == "mock_api_secret"


@patch("ccxt.binance.fetch_ticker")
def test_fetch_market_data(mock_fetch_ticker, data_feed):
    """Test fetch_market_data with valid data."""
    mock_fetch_ticker.return_value = {"symbol": "BTC/USDT", "last": 50000}
    ticker = data_feed.fetch_market_data(exchange_name="binance", symbol="BTC/USDT")
    assert ticker["symbol"] == "BTC/USDT"
    assert ticker["last"] == 50000


@patch("ccxt.binance.fetch_ticker", side_effect=Exception("API Error"))
def test_fetch_market_data_with_retry(mock_fetch_ticker, data_feed):
    """Test fetch_market_data retry logic."""
    with pytest.raises(Exception, match="API Error"):
        data_feed.fetch_market_data(exchange_name="binance", symbol="BTC/USDT")


@patch("ccxt.binance.fetch_ohlcv")
def test_fetch_historical_data(mock_fetch_ohlcv, data_feed):
    """Test fetch_historical_data with valid OHLCV data."""
    mock_fetch_ohlcv.return_value = [
        [1625097600000, 50000, 51000, 49000, 50500, 100],
        [1625097660000, 50500, 51500, 49500, 51000, 200],
    ]
    ohlcv = data_feed.fetch_historical_data(
        exchange_name="binance", symbol="BTC/USDT", timeframe="1h", limit=2
    )
    assert len(ohlcv) == 2
    assert ohlcv[0][0] == 1625097600000  # Timestamp
    assert ohlcv[0][4] == 50500  # Closing price


@patch("ccxt.binance.fetch_ohlcv", side_effect=Exception("API Error"))
def test_fetch_historical_data_with_retry(mock_fetch_ohlcv, data_feed):
    """Test fetch_historical_data retry logic."""
    with pytest.raises(Exception, match="API Error"):
        data_feed.fetch_historical_data(exchange_name="binance", symbol="BTC/USDT")