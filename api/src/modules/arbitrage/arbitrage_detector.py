# src/modules/arbitrage/arbitrage_detector.py

import ccxt
import yaml
import time
from src.utils.logger import get_logger
from src.modules.order_management.order_manager import OrderManager

class ArbitrageDetector:
    def __init__(self, config_path="src/config/arbitrage_config.yaml", secrets_path="src/config/secrets.yaml"):
        """
        Initializes the Arbitrage Detector.
        :param config_path: Path to the arbitrage configuration file.
        :param secrets_path: Path to the API credentials file.
        """
        self.logger = get_logger("ArbitrageDetector")
        self.config = self._load_yaml(config_path)
        self.secrets = self._load_yaml(secrets_path)
        self.exchanges = self._initialize_exchanges()
        self.order_manager = OrderManager()

    def _load_yaml(self, path):
        """Load YAML configuration file."""
        try:
            with open(path, "r") as file:
                return yaml.safe_load(file)
        except Exception as e:
            self.logger.error(f"Failed to load YAML file {path}: {e}")
            return {}

    def _initialize_exchanges(self):
        """Initialize exchange connections with API keys."""
        exchanges = {}
        for exchange_name, credentials in self.secrets.get("exchanges", {}).items():
            try:
                exchange_class = getattr(ccxt, exchange_name)
                exchanges[exchange_name] = exchange_class({
                    "apiKey": credentials["api_key"],
                    "secret": credentials["api_secret"],
                })
                self.logger.info(f"Connected to {exchange_name}")
            except Exception as e:
                self.logger.error(f"Failed to connect to {exchange_name}: {e}")
        return exchanges

    def get_price_data(self, exchange_name, symbol):
        """
        Fetches market price for a given exchange and symbol.
        :param exchange_name: Name of the exchange.
        :param symbol: Trading pair (e.g., BTC/USDT).
        :return: Market price or None if failed.
        """
        exchange = self.exchanges.get(exchange_name)
        if not exchange:
            self.logger.error(f"Exchange {exchange_name} not initialized.")
            return None

        try:
            ticker = exchange.fetch_ticker(symbol)
            return ticker["last"]  # Latest trade price
        except Exception as e:
            self.logger.error(f"Failed to fetch market data from {exchange_name}: {e}")
            return None

    def detect_arbitrage(self, symbol):
        """
        Identifies arbitrage opportunities across exchanges.
        :param symbol: Trading pair to check (e.g., BTC/USDT).
        :return: Best arbitrage opportunity if found.
        """
        min_profit_percent = self.config["arbitrage"]["min_profit_percent"]
        fee_tracking = self.config["arbitrage"]["fee_tracking"]
        
        price_data = {}
        for exchange in self.exchanges:
            price = self.get_price_data(exchange, symbol)
            if price:
                price_data[exchange] = price

        if len(price_data) < 2:
            self.logger.warning("Insufficient data for arbitrage detection.")
            return None

        # Find highest and lowest price differences
        highest_exchange, highest_price = max(price_data.items(), key=lambda x: x[1])
        lowest_exchange, lowest_price = min(price_data.items(), key=lambda x: x[1])

        price_difference = highest_price - lowest_price
        profit_percent = (price_difference / lowest_price) * 100

        if profit_percent >= min_profit_percent:
            # Check fees
            if fee_tracking:
                withdrawal_fee = self.config["exchanges"][lowest_exchange]["withdrawal_fee"].get(symbol.split("/")[0], 0)
                trading_fee = self.config["exchanges"][highest_exchange]["trading_fee"]
                total_fees = withdrawal_fee + trading_fee
                net_profit = profit_percent - total_fees

                if net_profit < min_profit_percent:
                    self.logger.info(f"Arbitrage opportunity found but fees negate profitability.")
                    return None
            else:
                net_profit = profit_percent

            arbitrage_opportunity = {
                "buy_exchange": lowest_exchange,
                "sell_exchange": highest_exchange,
                "buy_price": lowest_price,
                "sell_price": highest_price,
                "profit_percent": net_profit
            }

            self.logger.info(f"Arbitrage Opportunity: {arbitrage_opportunity}")
            return arbitrage_opportunity

        self.logger.info("No profitable arbitrage opportunity detected.")
        return None

    def execute_arbitrage_trade(self, opportunity, trade_size):
        """
        Executes arbitrage trade.
        :param opportunity: Detected arbitrage opportunity.
        :param trade_size: Size of the trade in base asset (e.g., BTC).
        """
        if not self.config["arbitrage"]["trade_execution"]:
            self.logger.info("Trade execution disabled in config.")
            return

        buy_exchange = opportunity["buy_exchange"]
        sell_exchange = opportunity["sell_exchange"]
        buy_price = opportunity["buy_price"]
        sell_price = opportunity["sell_price"]

        self.logger.info(f"Executing Arbitrage: Buying {trade_size} at {buy_exchange} for {buy_price} and selling on {sell_exchange} for {sell_price}")

        # Place buy order
        buy_order = self.order_manager.place_order(buy_exchange, symbol, "limit", "buy", trade_size, buy_price)
        if not buy_order:
            self.logger.error("Failed to place buy order. Aborting arbitrage execution.")
            return

        # Transfer funds to the selling exchange (simulated)
        time.sleep(self.config["arbitrage"]["max_transfer_time"])

        # Place sell order
        sell_order = self.order_manager.place_order(sell_exchange, symbol, "limit", "sell", trade_size, sell_price)
        if not sell_order:
            self.logger.error("Failed to place sell order. Consider manually selling.")

        self.logger.info("Arbitrage trade executed successfully.")