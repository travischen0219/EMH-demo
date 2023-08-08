from datetime import datetime

from bson import ObjectId
from pydantic import BaseModel


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)


class ContextModel(BaseModel):
    user_id: str
    request: str
    response: str
    audio: bytes
    video: bytes
    created_at: datetime
    updated_at: datetime

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,  # convert ObjectId to string
            datetime: lambda dt: dt.isoformat(),  # convert datetime to ISO format
        }
