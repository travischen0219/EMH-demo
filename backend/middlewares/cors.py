from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# setup CORS
origins = [
    "http://localhost:3000",  # React server
    # "http://localhost:8000",  # Uncomment this line if your FastAPI server is running on a different port
]


def add_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app
