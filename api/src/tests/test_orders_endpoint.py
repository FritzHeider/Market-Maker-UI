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
