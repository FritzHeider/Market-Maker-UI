import types

from fastapi.testclient import TestClient

from src import main as main_module

client = TestClient(main_module.app)


def test_portfolio_success(monkeypatch):
    tracker = types.SimpleNamespace(
        secrets={"exchanges": {"binance": {"api_key": "k", "api_secret": "s"}}},
        config={"portfolio_management": {"pnl_calculation": {"enabled": True}, "initial_portfolio_value": 100}},
    )

    def get_balances():
        return {"binance": {"USDT": 120.0, "BTC": 0.0}}

    def calculate_pnl(initial_value):
        assert initial_value == 100
        return {"pnl": 20.0}

    tracker.get_balances = get_balances
    tracker.calculate_pnl = calculate_pnl

    monkeypatch.setattr(main_module, "portfolio_tracker", tracker)

    response = client.get("/portfolio")
    assert response.status_code == 200
    assert response.json() == {"balance": 120.0, "pnl": 20.0}


def test_portfolio_missing_credentials(monkeypatch):
    tracker = types.SimpleNamespace(
        secrets={"exchanges": {"binance": {"api_key": "", "api_secret": ""}}},
        config={},
        get_balances=lambda: {},
        calculate_pnl=lambda *_args, **_kwargs: {"pnl": 0},
    )

    monkeypatch.setattr(main_module, "portfolio_tracker", tracker)

    response = client.get("/portfolio")
    assert response.status_code == 400
    assert response.json() == {
        "detail": "API keys not found. Please authenticate via OAuth."
    }
