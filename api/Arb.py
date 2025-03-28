class ArbitrageModule:
    def __init__(self, fee_structure: Dict[str, Dict[str, float]]):
        """
        :param fee_structure: A dictionary containing trading, withdrawal, and deposit fees for each exchange.
        Example:
        {
            "binance": {"trading_fee": 0.001, "withdrawal_fee": 0.0005},
            "kraken": {"trading_fee": 0.002, "withdrawal_fee": 0.001}
        }
        """
        self.fee_structure = fee_structure

    def calculate_arbitrage(self, prices: Dict[str, float], symbol: str) -> Optional[Dict]:
        """
        Calculate arbitrage opportunities based on price differences.
        :param prices: Current prices across exchanges.
        :param symbol: The trading pair (e.g., "BTC/USD").
        :return: Arbitrage opportunity details or None if no profitable opportunities.
        """
        sorted_prices = sorted(prices.items(), key=lambda x: x[1])
        buy_exchange, buy_price = sorted_prices[0]
        sell_exchange, sell_price = sorted_prices[-1]

        # Calculate fees
        buy_fee = self.fee_structure[buy_exchange]["trading_fee"]
        sell_fee = self.fee_structure[sell_exchange]["trading_fee"]
        transfer_cost = self.fee_structure[sell_exchange]["withdrawal_fee"]

        # Net profit
        net_profit = (sell_price - buy_price) - (buy_price * buy_fee) - (sell_price * sell_fee) - transfer_cost

        if net_profit > 0:
            return {
                "symbol": symbol,
                "buy_exchange": buy_exchange,
                "buy_price": buy_price,
                "sell_exchange": sell_exchange,
                "sell_price": sell_price,
                "net_profit": net_profit
            }
        return None
w