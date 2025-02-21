from pydantic import BaseModel

class credModel(BaseModel):
    user_name : str
    password : str
    user_type:str