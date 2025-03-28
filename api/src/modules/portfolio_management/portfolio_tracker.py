# src/modules/portfolio_management/portfolio_tracker.py

import ccxt
import yaml
import time
from src.utils.logger import get_logger

class PortfolioTracker:
    def __init__(self, config_path="src/config/portfolio_config.yaml", secrets_path="src/config/secrets.yaml"):
        """
        Initializes the Portfolio Management module.
        :param config_path: Path to the portfolio configuration file.
        :param secrets_path: Path to the API credentials file.
        """
        self.logger = get_logger("PortfolioTracker")
        self.config = self._load_yaml(config_path)
        self.secrets = self._load_yaml(secrets_path)
        self.exchanges = self._initialize_exchanges()
        self.portfolio = {}

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

    def get_balances(self):
        """
        Fetches balances from all exchanges and updates portfolio.
        """
        for exchange_name, exchange in self.exchanges.items():
            try:
                balance_data = exchange.fetch_balance()
                self.portfolio[exchange_name] = balance_data["total"]
                self.logger.info(f"Updated balances from {exchange_name}: {self.portfolio[exchange_name]}")
            except Exception as e:
                self.logger.error(f"Failed to fetch balance from {exchange_name}: {e}")

        return self.portfolio

    def calculate_pnl(self, initial_portfolio_value):
        """
        Computes profit & loss (PnL) for the portfolio.

        :param initial_portfolio_value: Starting portfolio value.
        :return: Dictionary with PnL information.
        """
        total_value = sum(self.get_balances().values())
        pnl = total_value - initial_portfolio_value
        pnl_percentage = (pnl / initial_portfolio_value) * 100 if initial_portfolio_value else 0

        self.logger.info(f"Portfolio PnL: {pnl} ({pnl_percentage:.2f}%)")
        return {"total_value": total_value, "pnl": pnl, "pnl_percentage": pnl_percentage}

    def monitor_asset_exposure(self):
        """
        Ensures that no single asset exceeds the portfolio's max asset exposure limit.
        """
        total_value = sum(self.get_balances().values())
        max_exposure_percent = self.config["portfolio_management"]["max_asset_exposure_percent"]

        for exchange, balances in self.portfolio.items():
            for asset, amount in balances.items():
                asset_value = amount * self._get_market_price(exchange, asset)
                exposure_percent = (asset_value / total_value) * 100 if total_value else 0

                if exposure_percent > max_exposure_percent:
                    self.logger.warning(f"High exposure in {asset}: {exposure_percent:.2f}% exceeds {max_exposure_percent}% limit.")

    def _get_market_price(self, exchange_name, asset):
        """
        Fetches the latest market price for an asset.
        :param exchange_name: Exchange name.
        :param asset: Asset symbol (e.g., BTC, ETH).
        :return: Latest price of the asset.
        """
        exchange = self.exchanges.get(exchange_name)
        if not exchange:
            self.logger.error(f"Exchange {exchange_name} not initialized.")
            return None

        try:
            ticker = exchange.fetch_ticker(f"{asset}/USDT")
            return ticker["last"]
        except Exception as e:
            self.logger.error(f"Failed to fetch price for {asset} on {exchange_name}: {e}")
            return 0

    def track_portfolio(self):
        """
        Continuously tracks the portfolio at regular intervals.
        """
        update_frequency = self.config["portfolio_management"]["update_frequency"]
        while True:
            self.logger.info("Updating portfolio balances and risk monitoring...")
            self.get_balances()
            self.monitor_asset_exposure()
            time.sleep(update_frequency)