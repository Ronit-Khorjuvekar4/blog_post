from fastapi import APIRouter,HTTPException
from model.CredModel import credModel as State
from controller.CredController import registerController,loginController,refreshTokenController
import jwt
from datetime import datetime, timedelta
import os
from dotenv import dotenv_values, load_dotenv
from model.RefreshModel import RefreshTokenRequest as ok
load_dotenv()

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
REFRESH_TOKEN_EXPIRE_MINUTES = os.getenv("REFRESH_TOKEN_EXPIRE_MINUTES")


@router.post("/register")
async def register(state:State):
    print(state)
    res = await registerController(state)
    return res

@router.post("/login")
async def register(state:State):
    print(state)
    res = await loginController(state)
    return res

@router.post("/refresh_token")
async def refresh_token(refresh_token: dict):
    print(refresh_token.get("refresh_token"))
    refresh_token = refresh_token.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=400, detail="Missing refresh token")
    
    try:
        # Ensure refresh_token is a string before decoding
        payload = jwt.decode(str(refresh_token), SECRET_KEY, algorithms=[ALGORITHM])
        res = await refreshTokenController(payload)
        return res
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token")

        