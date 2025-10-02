from fastapi.testclient import TestClient

from src.main import app


class FakeDataFeed:
    def __init__(self):
        self.started = False
        self.stopped = False
        self.received_args = None

    async def start_websocket(self, exchange_name, symbol, on_message):
        self.started = True
        self.received_args = (exchange_name, symbol)
        await on_message({"exchange": exchange_name, "symbol": symbol})

    async def stop_websocket(self):
        self.stopped = True


def test_ticker_websocket_emits_messages(monkeypatch):
    fake_feed = FakeDataFeed()
    monkeypatch.setattr("src.main.data_feed", fake_feed)

    client = TestClient(app)

    with client.websocket_connect("/ws/ticker?exchange=testex&symbol=TESTUSD") as websocket:
        message = websocket.receive_json()
        assert message == {"exchange": "testex", "symbol": "TESTUSD"}

    assert fake_feed.started is True
    assert fake_feed.stopped is True
    assert fake_feed.received_args == ("testex", "TESTUSD")
