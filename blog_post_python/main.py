from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.blogRouter.CrudeRoute import router as CrudeRoute
from router.credentialRouter.cred import router as CredRoute
import uvicorn

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3001",
    "http://localhost:3000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(CrudeRoute)
app.include_router(CredRoute)

if __name__ == "__main__":
    uvicorn.run(app)


