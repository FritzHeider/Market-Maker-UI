# src/modules/datafeed/data_feed.py

import ccxt
import yaml
import asyncio
from tenacity import retry, stop_after_attempt, wait_fixed
from src.modules.utils.logger import get_logger
from src.modules.datafeed.websocket_client import WebSocketClient


class DataFeed:
    """Handles fetching market data via REST APIs and real-time WebSocket connections."""

    def __init__(self, config_path: str, secrets_path: str):
        """
        Initialize the DataFeed module with exchange APIs and WebSocket support.

        :param config_path: Path to the config.yaml file.
        :param secrets_path: Path to the secrets.yaml file.
        """
        self.logger = get_logger("DataFeed")
        self.config = self._load_yaml(config_path)
        self.secrets = self._load_yaml(secrets_path)
        self.exchanges = self._initialize_exchanges()
        self.websocket_client = None  # WebSocket client instance

    def _load_yaml(self, path: str):
        """Load a YAML file and handle errors."""
        try:
            with open(path, "r") as file:
                return yaml.safe_load(file)
        except Exception as e:
            self.logger.error(f"Failed to load YAML file at {path}: {e}")
            return {}

    def _initialize_exchanges(self):
        """Initialize exchange clients using CCXT with API credentials."""
        exchanges = {}
        for exchange_name, credentials in self.secrets.get("exchanges", {}).items():
            try:
                exchange_class = getattr(ccxt, exchange_name)
                exchanges[exchange_name] = exchange_class({
                    "apiKey": credentials["api_key"],
                    "secret": credentials["api_secret"]
                })
                self.logger.info(f"Initialized exchange: {exchange_name}")
            except Exception as e:
                self.logger.error(f"Failed to initialize {exchange_name}: {e}")
        return exchanges

    def _get_exchange(self, exchange_name: str):
        """Retrieve the exchange client by name."""
        exchange = self.exchanges.get(exchange_name)
        if not exchange:
            self.logger.error(f"Exchange {exchange_name} is not initialized.")
        return exchange

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    def fetch_market_data(self, exchange_name: str, symbol: str):
        """
        Fetch market ticker data for a specific symbol from an exchange, with retry logic.

        :param exchange_name: Name of the exchange (e.g., 'binance').
        :param symbol: Trading pair symbol (e.g., 'BTC/USDT').
        :return: Ticker data or None if an error occurs.
        """
        exchange = self._get_exchange(exchange_name)
        if not exchange:
            return None

        try:
            ticker = exchange.fetch_ticker(symbol)
            self.logger.info(f"Fetched market data for {symbol} on {exchange_name}")
            return ticker
        except Exception as e:
            self.logger.warning(f"Retrying fetch_market_data for {symbol} on {exchange_name} due to error: {e}")
            raise

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    def fetch_historical_data(self, exchange_name: str, symbol: str, timeframe: str = "1h", limit: int = 100):
        """
        Fetch historical OHLCV data for a specific symbol from an exchange.

        :param exchange_name: Name of the exchange (e.g., 'binance').
        :param symbol: Trading pair symbol (e.g., 'BTC/USDT').
        :param timeframe: Timeframe for candlesticks (e.g., '1m', '1h', '1d').
        :param limit: Number of candlesticks to fetch.
        :return: List of OHLCV data or None if an error occurs.
        """
        exchange = self._get_exchange(exchange_name)
        if not exchange:
            return None

        try:
            ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit=limit)
            self.logger.info(f"Fetched historical data for {symbol} on {exchange_name}")
            return ohlcv
        except Exception as e:
            self.logger.warning(f"Retrying fetch_historical_data for {symbol} on {exchange_name} due to error: {e}")
            raise

    def start_websocket(self, exchange_name: str, symbol: str):
        """
        Initialize and start the WebSocket client for real-time data streaming.

        :param exchange_name: Name of the exchange (e.g., 'binance', 'coinbase', 'kraken').
        :param symbol: Trading pair symbol (e.g., 'BTCUSDT', 'BTC-USD').
        """
        # Define WebSocket URLs for supported exchanges
        ws_urls = {
            "binance": "wss://stream.binance.com:9443/ws",
            "coinbase": "wss://ws-feed.pro.coinbase.com",
            "kraken": "wss://ws.kraken.com"
        }

        if exchange_name not in ws_urls:
            self.logger.error(f"WebSocket is not supported for {exchange_name}")
            return

        ws_url = ws_urls[exchange_name]
        self.websocket_client = WebSocketClient(
            exchange_name=exchange_name,
            ws_url=ws_url,
            symbol=symbol
        )
        self.logger.info(f"Starting WebSocket for {symbol} on {exchange_name}")

        # Run WebSocket in an event loop
        try:
            asyncio.run(self.websocket_client.run())
        except Exception as e:
            self.logger.error(f"WebSocket client error: {e}")