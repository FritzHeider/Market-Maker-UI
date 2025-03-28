import ccxt
import logging
import time

class MultiExchangeConnector:
    def __init__(self, exchange_id, api_key, secret, testnet=False):
        """
        Initializes the exchange connection.
        
        :param exchange_id: Exchange name (e.g., 'binance', 'kraken', 'ftx', 'coinbasepro')
        :param api_key: API key for authentication
        :param secret: API secret for authentication
        :param testnet: If True, uses testnet for paper trading
        """
        self.exchange_id = exchange_id.lower()
        self.api_key = api_key
        self.secret = secret
        self.testnet = testnet
        self.exchange = self._connect_exchange()

    def _connect_exchange(self):
        """Connects to the selected exchange using API keys and handles testnet mode."""
        exchange_class = getattr(ccxt, self.exchange_id)
        exchange = exchange_class({
            'apiKey': self.api_key,
            'secret': self.secret,
            'enableRateLimit': True  # Prevent API ban due to rate limits
        })

        # Enable testnet for supported exchanges
        if self.exchange_id == "binance" and self.testnet:
            exchange.set_sandbox_mode(True)
            print("[INFO] Connected to Binance Testnet.")
        
        if self.exchange_id == "ftx" and self.testnet:
            exchange.urls['api'] = exchange.urls['test']
            print("[INFO] Connected to FTX Testnet.")

        return exchange

    def get_balance(self, asset):
        """Retrieves balance of a specific asset (e.g., BTC, USDT)."""
        try:
            balance = self.exchange.fetch_balance()
            return balance.get('total', {}).get(asset, 0)
        except Exception as e:
            logging.error(f"Error fetching balance: {e}")
            return None

    def get_market_price(self, symbol):
        """Fetches the latest market price for a trading pair."""
        try:
            ticker = self.exchange.fetch_ticker(symbol)
            return ticker['last']
        except Exception as e:
            logging.error(f"Error fetching market price: {e}")
            return None

    def place_order(self, symbol, order_type, side, amount, price=None):
        """Places an order on the exchange."""
        try:
            params = {}
            if order_type == 'limit':
                order = self.exchange.create_limit_order(symbol, side, amount, price, params)
            elif order_type == 'market':
                order = self.exchange.create_market_order(symbol, side, amount, params)
            else:
                raise ValueError("Invalid order type. Use 'limit' or 'market'.")
            
            return order
        except Exception as e:
            logging.error(f"Error placing order: {e}")
            return None

    def cancel_order(self, order_id, symbol):
        """Cancels an order."""
        try:
            return self.exchange.cancel_order(order_id, symbol)
        except Exception as e:
            logging.error(f"Error cancelling order: {e}")
            return None

    def get_open_orders(self, symbol):
        """Retrieves open orders for a given trading pair."""
        try:
            return self.exchange.fetch_open_orders(symbol)
        except Exception as e:
            logging.error(f"Error fetching open orders: {e}")
            return None

    def get_trade_history(self, symbol):
        """Fetches trade history for a given symbol."""
        try:
            return self.exchange.fetch_my_trades(symbol)
        except Exception as e:
            logging.error(f"Error fetching trade history: {e}")
            return None


if __name__ == "__main__":
    # Replace with your actual API keys for testing
    EXCHANGES = {
        "binance": {"api_key": "your_binance_api_key", "secret": "your_binance_secret"},
        "kraken": {"api_key": "your_kraken_api_key", "secret": "your_kraken_secret"},
        "coinbasepro": {"api_key": "your_coinbase_api_key", "secret": "your_coinbase_secret"},
        "ftx": {"api_key": "your_ftx_api_key", "secret": "your_ftx_secret"}
    }

    for exchange_id, creds in EXCHANGES.items():
        print(f"\n[INFO] Connecting to {exchange_id.upper()}...")
        connector = MultiExchangeConnector(exchange_id, creds["api_key"], creds["secret"], testnet=True)
        
        print(f"Balance for BTC on {exchange_id}: {connector.get_balance('BTC')}")
        print(f"BTC/USDT Price on {exchange_id}: {connector.get_market_price('BTC/USDT')}")