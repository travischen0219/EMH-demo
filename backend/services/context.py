import base64
from typing import List

from database import collection
from models.context import ContextModel


async def get_one_context(user_id: str) -> ContextModel:
    context_data = collection.find_one({"user_id": user_id})
    context = ContextModel(**context_data)

    if context:
        # Convert audio and video to base64
        context.audio = base64.b64encode(context.audio).decode()
        context.video = base64.b64encode(context.video).decode()

    return context


async def get_contexts(user_id: str) -> List[ContextModel]:
    contexts = collection.find({"user_id": user_id})
    # sort by timestamp
    contexts = sorted(contexts, key=lambda x: x["updated_at"])

    contexts = [ContextModel(**context) for context in contexts]
    for context in contexts:
        # Convert audio and video to base64
        context.audio = base64.b64encode(context.audio).decode()
        context.video = base64.b64encode(context.video).decode()

    return contexts
