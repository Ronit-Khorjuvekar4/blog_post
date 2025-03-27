from fastapi import APIRouter, Depends
from controller.BlogController import (
    addBlogController, getDataController, deleteDataController,
    editDataController, addProfileController, getProfileDataController
)
from model.AddBlog import AddBlog as State, ProfileInfo
from jwtToken import allowedRoles

router = APIRouter()

# ALL POST ROUTES
@router.post("/create")
async def create(
    state: State, 
    access_control: dict = Depends(allowedRoles(["user"]))
):
    res = await addBlogController(state)
    return res

@router.post("/profile")
async def profile(
    state: ProfileInfo, 
    access_control: dict = Depends(allowedRoles(["user", "admin"]))
):
    res = await addProfileController(state)
    return res

# ------------------------------------------------------- #
# ALL GET ROUTES
@router.get("/get")
async def get(
    access_control: dict = Depends(allowedRoles(["user", "admin"]))
):
    res = await getDataController()
    return res

@router.get("/get_profile")
async def get_profile(
    access_control: dict = Depends(allowedRoles(["user", "admin"]))
):
    res = await getProfileDataController()
    return res

# ------------------------------------------------------- #
# ALL DELETE ROUTES
@router.delete("/delete/{id}/{user_id}")
async def delete(
    id: str, 
    user_id: int, 
    access_control: dict = Depends(allowedRoles(["user"]))
):
    res = await deleteDataController(id, user_id)
    return res

# ------------------------------------------------------- #
# ALL PUT ROUTES
@router.put("/edit/{id}/{user_id}")
async def edit(
    id: str, 
    user_id: int, 
    state: State, 
    access_control: dict = Depends(allowedRoles(["user"]))
):
    res = await editDataController(id, user_id, state)
    return res
