from fastapi import APIRouter,Depends
from controller.BlogController import addBlogController,getDataController, deleteDataController, editDataController, addProfileController,getProfileDataController
from model.AddBlog import AddBlog as State,ProfileInfo
from jwtToken import allowedRoles

router = APIRouter()

allow_user = Depends(allowedRoles(["user"]))
allow_admin = Depends(allowedRoles(["admin"]))
allow_all = Depends(allowedRoles(["user", "admin"]))

# ALLPOST ROUTE
@router.post("/create")
async def create(state: State,dict = allow_user):
    res = await addBlogController(state)
    return res

@router.post("/profile")
async def profile(state:ProfileInfo,dict = allow_all):
    res = await addProfileController(state)
    return res

# ------------------------------------------------------- #
# ALL GET ROUTE
@router.get("/get")
async def get(dict = allow_all):
    res = await getDataController()
    return res

@router.get("/get_profile")
async def get(dict = allow_all):
    res = await getProfileDataController()
    return res

# ------------------------------------------------------- #
# ALL DELETE ROUTE
@router.delete("/delete/{id}")
async def delete(id:int,dict = allow_user):
    res = await deleteDataController(id)
    return res
 
# ------------------------------------------------------- #
# ALL PUT ROUTE
@router.put("/edit/{id}")
async def edit(id:int,state:State,dict = allow_user):
    print("ok",state)
    res = await editDataController(id,state)
    return res