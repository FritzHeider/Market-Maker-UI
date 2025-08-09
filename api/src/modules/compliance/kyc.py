"""Basic KYC placeholder endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.utils.logger import get_logger

router = APIRouter()
logger = get_logger("KYC")


class KYCRequest(BaseModel):
    user_id: str


@router.post("/verify")
def verify_kyc(payload: KYCRequest) -> dict:
    """Placeholder KYC verification that checks user_id presence."""
    if not payload.user_id:
        raise HTTPException(status_code=400, detail="user_id missing")
    logger.info("KYC verified for %s", payload.user_id)
    return {"status": "verified"}
