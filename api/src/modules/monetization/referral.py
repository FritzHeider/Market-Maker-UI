"""Simple referral code generation for virality."""

from uuid import uuid4
from fastapi import APIRouter

from src.utils.logger import get_logger

router = APIRouter()
logger = get_logger("Referral")


@router.post("/generate")
def generate_referral() -> dict:
    """Return a freshly generated referral code."""
    code = uuid4().hex[:8]
    logger.info("Generated referral code %s", code)
    return {"referral_code": code}
