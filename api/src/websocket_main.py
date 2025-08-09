"""Entry point to test the WebSocket client."""

import asyncio

from src.modules.datafeed.websocket_client import WebSocketClient
from src.utils.logger import get_logger


def main() -> None:
    """Run a simple WebSocket client example."""
    logger = get_logger("WebSocketMain")
    ws_client = WebSocketClient(
        exchange_name="binance",
        ws_url="wss://stream.binance.com:9443/ws",
        symbol="BTCUSDT",
    )
    try:
        asyncio.run(ws_client.run())
    except Exception as exc:
        logger.error("An error occurred in WebSocketClient: %s", exc)


if __name__ == "__main__":
    main()
