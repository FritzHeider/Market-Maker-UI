import requests
import pandas as pd
import matplotlib.pyplot as plt

# Dexscreener API endpoint for historical data
API_URL = "https://api.dexscreener.com/latest/dex/tokens/0x86b7cbA8d4bD93D20191614544ad26D011C9DE2b"

def fetch_historical_data():
    """Fetches historical price data from DexScreener API."""
    response = requests.get(API_URL)
    if response.status_code == 200:
        data = response.json()
        return data.get('pairs', [{}])[0].get('priceUsdHistory', [])
    else:
        print("Error fetching data")
        return []

def backtest_trade(buy_date, sell_date, investment=100):
    """Simulates a trade based on historical price data."""
    data = fetch_historical_data()
    if not data:
        print("No price data available.")
        return

    # Convert data into a DataFrame
    df = pd.DataFrame(data)
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
    df.set_index('timestamp', inplace=True)
    df['price'] = df['priceUsd'].astype(float)

    # Find buy & sell prices
    buy_price = df.loc[buy_date]['price'] if buy_date in df.index else None
    sell_price = df.loc[sell_date]['price'] if sell_date in df.index else None

    if buy_price is None or sell_price is None:
        print("Buy or sell date not found in data.")
        return

    # Calculate gains
    tokens_bought = investment / buy_price
    final_value = tokens_bought * sell_price
    profit = final_value - investment
    roi = (profit / investment) * 100

    print(f"\n📊 Trade Results from {buy_date} to {sell_date}:")
    print(f"💰 Initial Investment: ${investment}")
    print(f"📈 Buy Price: ${buy_price:.6f}")
    print(f"📉 Sell Price: ${sell_price:.6f}")
    print(f"📦 Tokens Bought: {tokens_bought:.2f} JCX")
    print(f"💵 Final Value: ${final_value:.2f}")
    print(f"🚀 Profit: ${profit:.2f} | ROI: {roi:.2f}%\n")

    # Plot price movement
    plt.figure(figsize=(10, 5))
    plt.plot(df.index, df['price'], label="Price")
    plt.axvline(buy_date, color='green', linestyle='--', label="Buy Date")
    plt.axvline(sell_date, color='red', linestyle='--', label="Sell Date")
    plt.legend()
    plt.title("Token Price Over Time")
    plt.xlabel("Date")
    plt.ylabel("Price (USD)")
    plt.grid()
    plt.show()

# Example usage (Jan 1, 2025 to Jan 7, 2025)
backtest_trade("2025-01-01", "2025-01-07")