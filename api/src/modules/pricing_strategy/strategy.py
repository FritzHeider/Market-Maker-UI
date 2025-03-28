# src/modules/pricing_strategy/strategy.py

import yaml
from src.utils.logger import get_logger

class PricingStrategy:
    def __init__(self, config_path="src/config/strategy_config.yaml"):
        """
        Initializes the Pricing Strategy module by loading strategy configurations.

        :param config_path: Path to the strategy configuration file.
        """
        self.logger = get_logger("PricingStrategy")
        self.config = self._load_yaml(config_path)
        self.selected_strategy = self.config.get("default_strategy", "fixed_spread")

    def _load_yaml(self, path):
        """Load YAML configuration file."""
        try:
            with open(path, "r") as file:
                return yaml.safe_load(file)
        except Exception as e:
            self.logger.error(f"Failed to load YAML file {path}: {e}")
            return {}

    def calculate_bid_ask(self, market_price, volatility=0, inventory_ratio=0):
        """
        Determines optimal bid/ask prices based on the selected strategy.

        :param market_price: Current market price.
        :param volatility: Market volatility percentage (used for dynamic strategies).
        :param inventory_ratio: Current inventory ratio for risk-based strategies.
        :return: Tuple (bid_price, ask_price)
        """
        strategy = self.selected_strategy
        if strategy == "fixed_spread":
            return self._fixed_spread(market_price)
        elif strategy == "dynamic_spread":
            return self._dynamic_spread(market_price, volatility)
        elif strategy == "inventory_based":
            return self._inventory_based(market_price, inventory_ratio)
        elif strategy == "ai_driven":
            return self._ai_optimized_pricing(market_price)
        else:
            self.logger.error(f"Unknown strategy: {strategy}")
            return None, None

    def _fixed_spread(self, market_price):
        """Apply fixed spread market-making strategy."""
        spread = self.config["strategies"]["fixed_spread"]["spread_percent"] / 100
        bid_price = market_price * (1 - spread)
        ask_price = market_price * (1 + spread)
        self.logger.info(f"Fixed Spread: Bid={bid_price}, Ask={ask_price}")
        return bid_price, ask_price

    def _dynamic_spread(self, market_price, volatility):
        """Adjust spread dynamically based on market volatility."""
        settings = self.config["strategies"]["dynamic_spread"]
        base_spread = settings["base_spread"] / 100
        volatility_factor = settings["volatility_factor"] / 100
        max_spread = settings["max_spread"] / 100

        spread = base_spread + (volatility * volatility_factor)
        spread = min(spread, max_spread)

        bid_price = market_price * (1 - spread)
        ask_price = market_price * (1 + spread)
        self.logger.info(f"Dynamic Spread: Bid={bid_price}, Ask={ask_price}, Spread={spread}")
        return bid_price, ask_price

    def _inventory_based(self, market_price, inventory_ratio):
        """Adjust spread based on inventory levels."""
        settings = self.config["strategies"]["inventory_based"]
        risk_aversion = settings["risk_aversion"]
        target_inventory = settings["target_inventory_ratio"]

        inventory_adjustment = risk_aversion * (inventory_ratio - target_inventory)
        bid_price = market_price * (1 - inventory_adjustment)
        ask_price = market_price * (1 + inventory_adjustment)
        self.logger.info(f"Inventory-Based: Bid={bid_price}, Ask={ask_price}, Adjustment={inventory_adjustment}")
        return bid_price, ask_price

    def _ai_optimized_pricing(self, market_price):
        """Placeholder for AI-driven pricing strategies."""
        self.logger.info(f"Using AI Model for Pricing Optimization")
        return market_price * 0.99, market_price * 1.01  # Placeholder logic