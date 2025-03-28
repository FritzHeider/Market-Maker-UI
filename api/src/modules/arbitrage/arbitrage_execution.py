# src/modules/arbitrage/arbitrage_execution.py

import time
from tenacity import retry, stop_after_attempt, wait_fixed
from src.utils.logger import get_logger
from src.modules.order_management.order_manager import OrderManager
from src.modules.risk_management.risk_manager import RiskManager

class ArbitrageExecution:
    def __init__(self, config_path="src/config/arbitrage_config.yaml"):
        """
        Initialize the Arbitrage Execution module.
        :param config_path: Path to the arbitrage configuration file.
        """
        self.logger = get_logger("ArbitrageExecution")
        self.config = self._load_yaml(config_path)
        self.order_manager = OrderManager()
        self.risk_manager = RiskManager()

    def _load_yaml(self, path):
        """Load YAML configuration file."""
        try:
            with open(path, "r") as file:
                return yaml.safe_load(file)
        except Exception as e:
            self.logger.error(f"Failed to load YAML file {path}: {e}")
            return {}

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    def execute_arbitrage(self, buy_exchange, sell_exchange, symbol, buy_price, sell_price, trade_size):
        """
        Executes arbitrage trade: buys on one exchange, sells on another.

        :param buy_exchange: Name of the exchange to buy from.
        :param sell_exchange: Name of the exchange to sell on.
        :param symbol: Trading pair (e.g., BTC/USDT).
        :param buy_price: Buy price on the source exchange.
        :param sell_price: Sell price on the destination exchange.
        :param trade_size: Size of the trade in base asset (e.g., BTC).
        """
        self.logger.info(f"Executing arbitrage: Buy {trade_size} {symbol} on {buy_exchange} at {buy_price}, "
                         f"Sell on {sell_exchange} at {sell_price}")

        # Check risk constraints before placing orders
        if not self.risk_manager.assess_order_risk(trade_size, portfolio_value=100):  # Example portfolio value
            self.logger.warning("Arbitrage trade rejected due to risk constraints.")
            return

        # Place buy order
        buy_order = self.order_manager.place_order(buy_exchange, symbol, "limit", "buy", trade_size, buy_price)
        if not buy_order:
            self.logger.error("Failed to place buy order. Aborting arbitrage trade.")
            return

        # Simulate fund transfer between exchanges (or implement real transfer)
        self._simulate_transfer(buy_exchange, sell_exchange, trade_size)

        # Place sell order
        sell_order = self.order_manager.place_order(sell_exchange, symbol, "limit", "sell", trade_size, sell_price)
        if not sell_order:
            self.logger.error("Failed to place sell order. Consider manual intervention.")
            return

        self.logger.info("Arbitrage trade executed successfully.")

    def _simulate_transfer(self, from_exchange, to_exchange, trade_size):
        """
        Simulates a fund transfer between exchanges for MVP. 
        In a real implementation, API integration for withdrawals and deposits would be used.

        :param from_exchange: Source exchange.
        :param to_exchange: Destination exchange.
        :param trade_size: Size of the transfer in base asset (e.g., BTC).
        """
        transfer_time = self.config["arbitrage"]["max_transfer_time"]
        self.logger.info(f"Simulating transfer of {trade_size} BTC from {from_exchange} to {to_exchange}. "
                         f"Estimated time: {transfer_time} minutes.")
        time.sleep(transfer_time * 60 / 10)  # Simulate 10% of the transfer time

    def retry_failed_execution(self, opportunity, trade_size):
        """
        Retry failed arbitrage execution based on the configured retry count.
        :param opportunity: Detected arbitrage opportunity.
        :param trade_size: Size of the trade.
        """
        retries = self.config["arbitrage"]["retries"]
        for attempt in range(retries):
            self.logger.info(f"Retry attempt {attempt + 1} for arbitrage execution.")
            self.execute_arbitrage(
                opportunity["buy_exchange"],
                opportunity["sell_exchange"],
                opportunity["symbol"],
                opportunity["buy_price"],
                opportunity["sell_price"],
                trade_size
            )

    def apply_slippage_control(self, expected_price, actual_price):
        """
        Enforces slippage control by ensuring that the execution price remains within acceptable limits.
        :param expected_price: The anticipated trade execution price.
        :param actual_price: The actual trade execution price.
        :return: Boolean indicating whether the slippage is within acceptable limits.
        """
        slippage_tolerance = self.config["arbitrage"]["slippage_tolerance"] / 100
        if abs(expected_price - actual_price) / expected_price > slippage_tolerance:
            self.logger.warning(f"Slippage too high! Expected: {expected_price}, Actual: {actual_price}")
            return False
        return True