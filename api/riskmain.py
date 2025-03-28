from datetime import datetime, timedelta
from src.modules.risk_management.risk_manager import RiskManager

def main():
    risk_manager = RiskManager()

    # Simulated trade data
    trade_size = 5  # BTC
    portfolio_value = 200  # Total BTC portfolio
    entry_price = 50000  # Trade entry price
    current_price = 48000  # Current market price
    expected_price = 50000  # Expected execution price
    actual_price = 49700  # Actual execution price
    last_trade_time = datetime.now() - timedelta(seconds=2)  # Last trade occurred 2 seconds ago
    current_time = datetime.now()
    volatility = 6  # Market volatility (%)
    order_book_depth = 4000  # Order book liquidity ($)

    # Risk Assessments
    print("Order Risk:", risk_manager.assess_order_risk(trade_size, portfolio_value))
    print("Stop-Loss Triggered:", risk_manager.check_stop_loss(entry_price, current_price))
    print("Slippage Allowed:", risk_manager.enforce_slippage_limit(expected_price, actual_price))
    print("Cooldown Active:", risk_manager.apply_cooldown(last_trade_time, current_time))
    print("Market Conditions Safe:", risk_manager.monitor_market_conditions(volatility, order_book_depth))

if __name__ == "__main__":
    main()