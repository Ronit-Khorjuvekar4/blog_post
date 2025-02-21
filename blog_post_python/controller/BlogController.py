# Here read all the params, and direct it to another folder/file

from fastapi import Depends
from jwtToken import allowedRoles

from descriptor.BlogDescriptor import AddDataDescriptor, getDataDescriptor, deleteDataDescriptor, editDataDescriptor, addProfileDescriptor, getProfileDataDescriptor
from fastapi import HTTPException, status

async def addBlogController(state):
    addBlog = await AddDataDescriptor(state)
    return addBlog

async def getDataController():
    res = await getDataDescriptor()
    return res

async def deleteDataController(id):
    res = await deleteDataDescriptor(id)
    return res

async def editDataController(id,state):
    res = await editDataDescriptor(id,state)
    return res

async def addProfileController(state):
    res = await addProfileDescriptor(state)
    return res

async def getProfileDataController():
    res = await getProfileDataDescriptor()
    return res