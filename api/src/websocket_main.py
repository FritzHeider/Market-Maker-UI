# src/websocket_main.py

import asyncio
from src.modules.datafeed.websocket_client import WebSocketClient
from src.utils.logger import get_logger

def main():
    # Set up logger
    logger = get_logger("WebSocketMain")

    # Define WebSocket parameters
    ws_client = WebSocketClient(
        exchange_name="binance",
        ws_url="wss://stream.binance.com:9443/ws",
        symbol="BTCUSDT"
    )

    try:
        asyncio.run(ws_client.run())
    except Exception as e:
        logger.error(f"An error occurred in WebSocketClient: {e}")


if __name__ == "__main__":
    main()
    # src/modules/datafeed/websocket_client.py

import websockets
import asyncio
import json
from src.utils.logger import get_logger

class WebSocketClient:
    def __init__(self, exchange_name: str, ws_url: str, symbol: str):
        self.logger = get_logger("WebSocketClient")
        self.exchange_name = exchange_name
        self.ws_url = ws_url
        self.symbol = symbol

    async def run(self):
        async with websockets.connect(self.ws_url) as connection:
            if self.exchange_name == "binance":
                payload = {"method": "SUBSCRIBE", "params": [f"{self.symbol.lower()}@ticker"], "id": 1}
            elif self.exchange_name == "coinbase":
                payload = {"type": "subscribe", "channels": [{"name": "ticker", "product_ids": [self.symbol]}]}
            else:
                self.logger.error(f"Unsupported WebSocket protocol for {self.exchange_name}")
                return
            await connection.send(json.dumps(payload))
            while True:
                data = await connection.recv()
                self.logger.info(f"Received: {data}")