from descriptor.CredDescriptor import registerDescriptor, loginDescriptor
from dotenv import dotenv_values, load_dotenv
import os
from datetime import datetime, timedelta
from jwtToken import create_access_token,create_refresh_token
from fastapi import APIRouter,HTTPException, status
import jwt


load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
REFRESH_TOKEN_EXPIRE_MINUTES = os.getenv("REFRESH_TOKEN_EXPIRE_MINUTES")

async def registerController(state):
    res = await registerDescriptor(state)
    return res 

async def loginController(state):
    res = await loginDescriptor(state) 
    
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))  
    refresh_token_expires = timedelta(minutes=int(REFRESH_TOKEN_EXPIRE_MINUTES))  
    access_token = create_access_token(data={"user_name": res['data']['user_name'],"user_type":res['data']['user_type'],"id":res['data']['id']}, expires_delta=access_token_expires)
    refresh_token = create_refresh_token(data={"user_name": res['data']['user_name'],"user_type":res['data']['user_type'],"id":res['data']['id']}, expires_delta=refresh_token_expires)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }

async def refreshTokenController(res):
    try:
        username = res.get("user_name")
        user_type = res.get("user_type")
        id = res.get("id")

        if not username:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid refresh token")
        
        # Create new access token
        access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
        access_token = create_access_token(data={"user_name": username,"user_type":user_type,"id":id}, expires_delta=access_token_expires)
        
        return {"access_token": access_token, "token_type": "bearer"}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token expired")
    except jwt.DecodeError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
