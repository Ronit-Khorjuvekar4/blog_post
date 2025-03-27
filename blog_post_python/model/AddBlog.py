from pydantic import BaseModel

class AddBlog(BaseModel):
    blog_id: str | None = None
    user_id: int | None = None
    blog_title: str | None = None
    blog_subject: str | None = None 
    blog_content: str | None = None

class ProfileInfo(BaseModel):
    user_id:int | None = None
    email:str | None = None
    age:int | None = None
    about:str | None = None
 