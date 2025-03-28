# src/modules/risk_management/risk_manager.py

import yaml
from src.utils.logger import get_logger

class RiskManager:
    def __init__(self, config_path="src/config/risk_config.yaml"):
        """
        Initializes the Risk Manager module by loading risk configurations.

        :param config_path: Path to the risk management configuration file.
        """
        self.logger = get_logger("RiskManager")
        self.config = self._load_yaml(config_path)
        self.risk_settings = self.config.get("risk_management", {})

    def _load_yaml(self, path):
        """Load YAML configuration file."""
        try:
            with open(path, "r") as file:
                return yaml.safe_load(file)
        except Exception as e:
            self.logger.error(f"Failed to load YAML file {path}: {e}")
            return {}

    def assess_order_risk(self, trade_size, portfolio_value):
        """
        Check if the trade size exceeds the allowed limit.

        :param trade_size: Size of the trade in base asset (e.g., BTC).
        :param portfolio_value: Total value of the portfolio.
        :return: Boolean indicating whether the trade is within the risk limits.
        """
        max_order_size = self.risk_settings.get("max_order_size", 10)
        max_exposure_percent = self.risk_settings.get("max_exposure", 50)

        if trade_size > max_order_size:
            self.logger.warning(f"Trade size {trade_size} exceeds max order size {max_order_size}!")
            return False

        max_exposure_value = (max_exposure_percent / 100) * portfolio_value
        if trade_size > max_exposure_value:
            self.logger.warning(f"Trade size {trade_size} exceeds max exposure of {max_exposure_value}!")
            return False

        return True

    def check_stop_loss(self, entry_price, current_price):
        """
        Evaluate if stop-loss has been hit.

        :param entry_price: Price at which the trade was executed.
        :param current_price: Current market price.
        :return: Boolean indicating whether stop-loss should trigger.
        """
        stop_loss_percent = self.risk_settings.get("stop_loss_percent", 2) / 100
        stop_loss_threshold = entry_price * (1 - stop_loss_percent)

        if current_price <= stop_loss_threshold:
            self.logger.warning(f"Stop-loss triggered! Entry: {entry_price}, Current: {current_price}")
            return True

        return False

    def enforce_slippage_limit(self, expected_price, actual_price):
        """
        Ensure slippage is within allowed thresholds.

        :param expected_price: Expected trade execution price.
        :param actual_price: Actual trade execution price.
        :return: Boolean indicating whether slippage is within acceptable range.
        """
        max_slippage_percent = self.risk_settings.get("max_slippage_percent", 0.5) / 100
        allowed_slippage = expected_price * max_slippage_percent

        if abs(expected_price - actual_price) > allowed_slippage:
            self.logger.warning(f"Slippage too high! Expected: {expected_price}, Actual: {actual_price}")
            return False

        return True

    def apply_cooldown(self, last_trade_time, current_time):
        """
        Prevent excessive trading by enforcing a cooldown period.

        :param last_trade_time: Timestamp of the last executed trade.
        :param current_time: Current timestamp.
        :return: Boolean indicating whether the bot should wait before placing another trade.
        """
        cooldown_time = self.risk_settings.get("cooldown_time", 5)

        if (current_time - last_trade_time).total_seconds() < cooldown_time:
            self.logger.warning(f"Trade cooldown active! Wait for {cooldown_time} seconds.")
            return False

        return True

    def monitor_market_conditions(self, volatility, order_book_depth):
        """
        Check if market conditions meet risk thresholds.

        :param volatility: Current market volatility (%).
        :param order_book_depth: Depth of the order book ($).
        :return: Boolean indicating whether trading conditions are safe.
        """
        high_volatility_threshold = self.risk_settings.get("alert_thresholds", {}).get("high_volatility", 5)
        low_liquidity_threshold = self.risk_settings.get("alert_thresholds", {}).get("low_liquidity", 5000)

        if volatility > high_volatility_threshold:
            self.logger.warning(f"High volatility detected ({volatility}%). Consider reducing exposure!")
            return False

        if order_book_depth < low_liquidity_threshold:
            self.logger.warning(f"Low liquidity detected ({order_book_depth}). Trading may be risky!")
            return False

        return True