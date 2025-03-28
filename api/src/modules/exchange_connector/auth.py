                                                                                    # src/modules/exchange_connector/auth.p
from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/auth/ping")
async def ping():
    """Simple health check endpoint for authentication service."""
    return {"message": "Auth module is working!"}