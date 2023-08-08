# %%
from pathlib import Path

from gridfs import GridFS, GridFSBucket
from pymongo import MongoClient

# Connection to Mongo
client = MongoClient(host="localhost", port=27017, username="raven", password="passwd")
# db = client.test_database
db = client.demo_database

# Create a GridFS object
fs = GridFS(db)
# %%
data = Path("/home/yt/Projects/EMH-demo/backend/test/data")
audio_path = data / "demo-sound.mp3"
video_path = data / "demo-video.mp4"
audio_data = audio_path.read_bytes()
video_path = video_path.read_bytes()
# %%
from datetime import datetime

from pydantic import BaseModel

user_id = "user_2SZYmfeTp0MftrHiGPmKDFWGBaU"


class Context(BaseModel):
    user_id: str
    request: str
    response: str
    audio: bytes
    video: bytes
    created_at: datetime
    updated_at: datetime


# %%
context = Context(
    user_id=user_id,
    request="this is a demo request",
    response="this is a demo response",
    audio=audio_data,
    video=video_path,
    created_at=datetime.now(),
    updated_at=datetime.now(),
)
# %%
collection = db["emh-demo"]

# %%
collection.insert_one(context.dict())
# %%
contexts = collection.find_one({"user_id": user_id})
# %%
