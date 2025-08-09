# src/modules/datafeed/websocket_client.py

import asyncio
import websockets
import json
from src.utils.logger import get_logger


class WebSocketClient:
    def __init__(self, exchange_name: str, ws_url: str, symbol: str):
        """
        Initialize the WebSocketClient.

        :param exchange_name: Name of the exchange (e.g., "binance", "coinbase").
        :param ws_url: WebSocket URL for the exchange.
        :param symbol: Trading pair symbol (e.g., "BTC/USDT").
        """
        self.logger = get_logger("WebSocketClient")
        self.exchange_name = exchange_name.lower()
        self.ws_url = ws_url
        self.symbol = symbol
        self.connection = None

    async def connect(self):
        """Establish a WebSocket connection."""
        try:
            self.connection = await websockets.connect(self.ws_url)
            self.logger.info(f"Connected to WebSocket: {self.ws_url}")
        except Exception as e:
            self.logger.error(f"Failed to connect to WebSocket: {e}")
            raise

    async def subscribe(self):
        """Subscribe to real-time data based on the exchange."""
        try:
            if self.exchange_name == "binance":
                payload = {
                    "method": "SUBSCRIBE",
                    "params": [f"{self.symbol.lower()}@ticker"],
                    "id": 1
                }
            elif self.exchange_name == "coinbase":
                payload = {
                    "type": "subscribe",
                    "channels": [{"name": "ticker", "product_ids": [self.symbol]}]
                }
            elif self.exchange_name == "kraken":
                payload = {
                    "event": "subscribe",
                    "pair": [self.symbol],
                    "subscription": {"name": "ticker"}
                }
            else:
                self.logger.error(f"WebSocket subscription not supported for {self.exchange_name}")
                return

            await self.connection.send(json.dumps(payload))
            self.logger.info(f"Subscribed to {self.symbol} on {self.exchange_name}")
        except Exception as e:
            self.logger.error(f"Subscription error for {self.exchange_name}: {e}")

    async def receive_data(self):
        """Receive and process real-time data."""
        try:
            while True:
                message = await self.connection.recv()
                data = json.loads(message)
                self.logger.info(f"Received data: {data}")
        except Exception as e:
            self.logger.error(f"Error receiving WebSocket data: {e}")

    async def run(self):
        """Main WebSocket event loop."""
        await self.connect()
        await self.subscribe()
        await self.receive_data()
