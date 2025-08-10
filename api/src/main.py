# api/src/main.py

import argparse
import os
import logging
import requests
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.modules.datafeed.data_feed import DataFeed
from src.modules.exchange_connector.auth import router as auth_router
from src.modules.exchange_connector.secrets_manager import get_api_keys
from src.modules.monetization.referral import router as referral_router
from src.modules.compliance.kyc import router as kyc_router

CLIENT_ID = os.getenv("OAUTH_CLIENT_ID", "")
CLIENT_SECRET = os.getenv("OAUTH_CLIENT_SECRET", "")
REDIRECT_URI = os.getenv("OAUTH_REDIRECT_URI", "")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

# Initialize FastAPI
app = FastAPI()

# Add CORS middleware to allow frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(auth_router, prefix="/auth")
app.include_router(referral_router, prefix="/referral")
app.include_router(kyc_router, prefix="/kyc")

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class OrderPayload(BaseModel):
    """Order parameters supplied by clients when creating a new order.

    Attributes:
        side: Direction of the trade, either ``"buy"`` or ``"sell"``.
        amount: Quantity of the asset to trade.
        symbol: Trading pair symbol such as ``"BTC/USDT"``.
        limitPrice: Optional limit price when ``type`` is ``"limit"``.
        type: Order type (e.g. ``"market"`` or ``"limit"``). Defaults to ``"market"``.
        clientOrderId: Optional client supplied identifier.
        takeProfit: Optional take profit price.
        stopLoss: Optional stop loss price.

    Example request payload::

        {
            "side": "buy",
            "amount": 0.1,
            "symbol": "BTC/USDT",
            "type": "market"
        }
    """

    side: str
    amount: float
    symbol: str
    limitPrice: Optional[float] = None
    type: str = "market"
    clientOrderId: Optional[str] = None
    takeProfit: Optional[float] = None
    stopLoss: Optional[float] = None


class Order(OrderPayload):
    """Server-side representation of an order.

    Extends :class:`OrderPayload` with additional read-only fields provided by
    the backend.

    Attributes:
        id: Unique identifier assigned to the order.
        price: Execution price for limit orders or fill price when executed.
        status: Current status such as ``"pending"`` or ``"filled"``.
        createdAt: UTC timestamp when the order was created.
        filledAt: UTC timestamp when the order was filled, if applicable.

    Example response object::

        {
            "id": 1,
            "side": "buy",
            "amount": 0.1,
            "symbol": "BTC/USDT",
            "type": "market",
            "status": "pending",
            "createdAt": "2023-01-01T00:00:00Z"
        }
    """

    id: int
    price: Optional[float] = None
    status: str = "pending"
    createdAt: datetime
    filledAt: Optional[datetime] = None


orders: List[Order] = []


@app.get("/")
def root():
    return {"message": "Trading Bot API Running"}

@app.get("/auth/login")
def login():
    """Redirect user to the OAuth login page."""
    auth_url = f"https://yourwebsite.com/oauth/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}"
    return {"login_url": auth_url}

@app.get("/auth/callback")
def exchange_code_for_token(code: str):
    """Exchange authorization code for access token."""
    token_url = "https://yourwebsite.com/oauth/token"
    data = {
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "code": code,
    }

    response = requests.post(token_url, data=data)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="OAuth token exchange failed")

    token_data = response.json()
    return {"access_token": token_data["access_token"], "expires_in": token_data["expires_in"]}

@app.get("/historical-prices")
def get_historical_prices():
    """Return mock historical price data for BTC/USDT."""
    now = datetime.utcnow()
    prices = [
        {"timestamp": (now - timedelta(minutes=i)).isoformat() + "Z", "price": 28800 + i * 5}
        for i in reversed(range(30))
    ]
    return prices


@app.get("/orders")
def list_orders(limit: int = 10):
    """Retrieve recently created orders.

    Parameters:
        limit: Maximum number of most recent orders to return. Defaults to 10.

    Returns:
        List[Order]: Array of order objects sorted by creation time.

    Sample request::

        GET /orders?limit=5

    Sample response::

        [
            {
                "id": 1,
                "side": "buy",
                "amount": 0.1,
                "symbol": "BTC/USDT",
                "type": "market",
                "status": "pending",
                "createdAt": "2023-01-01T00:00:00Z"
            }
        ]
    """

    return orders[-limit:]


@app.post("/orders")
def create_order(payload: OrderPayload):
    """Create and store a new order.

    Parameters:
        payload: :class:`OrderPayload` defining the order parameters.

    Returns:
        dict: ``{"success": True, "order": Order}``

    Sample request::

        POST /orders
        {
            "side": "buy",
            "amount": 0.1,
            "symbol": "BTC/USDT",
            "type": "market"
        }

    Sample response::

        {
            "success": true,
            "order": {
                "id": 1,
                "side": "buy",
                "amount": 0.1,
                "symbol": "BTC/USDT",
                "type": "market",
                "status": "pending",
                "createdAt": "2023-01-01T00:00:00Z"
            }
        }
    """

    order = Order(
        id=len(orders) + 1,
        createdAt=datetime.utcnow(),
        price=payload.limitPrice,
        **payload.dict(exclude={"limitPrice"}),
    )
    orders.append(order)
    return {"success": True, "order": order}

def fetch_rest_data(data_feed, user_id):
    """Fetch market data via REST API."""
    api_keys = get_api_keys(user_id)
    if not api_keys:
        logger.error("API keys not found. Please authenticate via OAuth.")
        return {"error": "API keys not found"}

    try:
        market_data = data_feed.fetch_market_data(
            exchange_name="binance",
            symbol="BTC/USDT",
            api_key=api_keys["api_key"],
            secret=api_keys["secret_key"],
        )
        logger.info(f"Market Data: {market_data}")
        return market_data
    except Exception as e:
        logger.error(f"Error fetching market data: {str(e)}")

def stream_websocket_data(data_feed, user_id):
    """Stream market data via WebSocket."""
    api_keys = get_api_keys(user_id)
    if not api_keys:
        logger.error("API keys not found. Please authenticate via OAuth.")
        return {"error": "API keys not found"}

    try:
        data_feed.start_websocket(exchange_name="binance", symbol="BTCUSDT",
                                  api_key=api_keys["api_key"], secret=api_keys["secret_key"])
        data_feed.start_websocket(exchange_name="coinbase", symbol="BTC-USD",
                                  api_key=api_keys["api_key"], secret=api_keys["secret_key"])
        data_feed.start_websocket(exchange_name="kraken", symbol="BTC/USD",
                                  api_key=api_keys["api_key"], secret=api_keys["secret_key"])
    except Exception as e:
        logger.error(f"Error streaming WebSocket data: {str(e)}")

def main():
    """Main function to run market data fetcher in CLI mode."""
    parser = argparse.ArgumentParser(description="Market Data Fetcher")
    parser.add_argument("--mode", type=str, choices=["rest", "websocket"], required=True,
                        help="Mode: 'rest' for REST API or 'websocket' for WebSocket streaming")
    parser.add_argument("--user_id", type=str, required=True, help="User ID for API authentication")

    args = parser.parse_args()
    data_feed = DataFeed(config_path="src/config/config.yaml", secrets_path="src/config/secrets.yaml")

    if args.mode == "rest":
        fetch_rest_data(data_feed, args.user_id)
    elif args.mode == "websocket":
        stream_websocket_data(data_feed, args.user_id)

if __name__ == "__main__":
    main()
