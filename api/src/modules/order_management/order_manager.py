# src/modules/order_management/order_manager.py

import ccxt
import yaml
import time
from tenacity import retry, stop_after_attempt, wait_fixed
from src.utils.logger import get_logger
from src.modules.risk_management.risk_manager import RiskManager

class OrderManager:
    def __init__(self, config_path="src/config/order_config.yaml", secrets_path="src/config/secrets.yaml"):
        """
        Initializes the Order Management module.
        :param config_path: Path to the order configuration file.
        :param secrets_path: Path to the API keys and credentials file.
        """
        self.logger = get_logger("OrderManager")
        self.config = self._load_yaml(config_path)
        self.secrets = self._load_yaml(secrets_path)
        self.exchanges = self._initialize_exchanges()
        self.risk_manager = RiskManager()

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

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    def place_order(self, exchange_name, symbol, order_type, side, quantity, price=None):
        """
        Place an order on the specified exchange.
        :param exchange_name: Exchange to execute trade (e.g., "binance").
        :param symbol: Trading pair (e.g., "BTC/USDT").
        :param order_type: Type of order ("market", "limit", "stop-limit").
        :param side: Buy or sell ("buy" or "sell").
        :param quantity: Amount of asset to trade.
        :param price: Price for limit/stop-limit orders (None for market orders).
        :return: Order execution details or None if failed.
        """
        exchange = self.exchanges.get(exchange_name)
        if not exchange:
            self.logger.error(f"Exchange {exchange_name} not initialized.")
            return None

        # Validate order against risk constraints
        portfolio_value = 100  # Placeholder for portfolio value retrieval
        if not self.risk_manager.assess_order_risk(quantity, portfolio_value):
            self.logger.warning(f"Order rejected due to risk constraints: {quantity} {symbol}")
            return None

        try:
            order_params = {"symbol": symbol, "side": side, "type": order_type, "quantity": quantity}
            if order_type in ["limit", "stop-limit"] and price:
                order_params["price"] = price

            order = exchange.create_order(**order_params)
            self.logger.info(f"Order placed on {exchange_name}: {order}")
            return order
        except Exception as e:
            self.logger.error(f"Order placement failed on {exchange_name}: {e}")
            return None

    def modify_order(self, exchange_name, order_id, new_price, new_quantity):
        """
        Modify an existing order.
        :param exchange_name: Exchange to modify order on.
        :param order_id: ID of the order to modify.
        :param new_price: New price for limit/stop-limit orders.
        :param new_quantity: Updated trade size.
        :return: Modified order details.
        """
        exchange = self.exchanges.get(exchange_name)
        if not exchange:
            self.logger.error(f"Exchange {exchange_name} not initialized.")
            return None

        try:
            cancel_status = exchange.cancel_order(order_id)
            if cancel_status:
                return self.place_order(exchange_name, order_type="limit", price=new_price, quantity=new_quantity)
        except Exception as e:
            self.logger.error(f"Failed to modify order {order_id} on {exchange_name}: {e}")
            return None

    def cancel_order(self, exchange_name, order_id):
        """
        Cancel an order.
        :param exchange_name: Exchange to cancel order on.
        :param order_id: ID of the order to cancel.
        :return: Cancellation status.
        """
        exchange = self.exchanges.get(exchange_name)
        if not exchange:
            self.logger.error(f"Exchange {exchange_name} not initialized.")
            return None

        try:
            cancel_status = exchange.cancel_order(order_id)
            self.logger.info(f"Order {order_id} canceled on {exchange_name}")
            return cancel_status
        except Exception as e:
            self.logger.error(f"Failed to cancel order {order_id} on {exchange_name}: {e}")
            return None

    def get_order_status(self, exchange_name, order_id):
        """
        Get the status of an order.
        :param exchange_name: Exchange to check order status.
        :param order_id: ID of the order.
        :return: Order status details.
        """
        exchange = self.exchanges.get(exchange_name)
        if not exchange:
            self.logger.error(f"Exchange {exchange_name} not initialized.")
            return None

        try:
            order_status = exchange.fetch_order(order_id)
            self.logger.info(f"Order status on {exchange_name}: {order_status}")
            return order_status
        except Exception as e:
            self.logger.error(f"Failed to fetch order status {order_id} on {exchange_name}: {e}")
            return None