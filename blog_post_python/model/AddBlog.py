from pydantic import BaseModel

class AddBlog(BaseModel):
    id:int | None = None
    blog_id:int | None = None
    blog_name:str | None = None
    blog_subject:str | None = None
    blog_details:str | None = None

class ProfileInfo(BaseModel):
    user_id:int | None = None
    email:str | None = None
    age:int | None = None
    about:str | None = None
