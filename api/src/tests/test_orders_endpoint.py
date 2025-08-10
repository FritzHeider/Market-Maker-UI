from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)


def test_orders_endpoint_cycle():
    # initial state
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
