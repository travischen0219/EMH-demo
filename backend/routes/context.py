from typing import List, Optional

from fastapi import APIRouter

from models.context import ContextModel
from services.context import get_contexts, get_one_context
from utils.logger import logger

router = APIRouter()


@router.get("/api/context/{user_id}", response_model=Optional[ContextModel])
async def retrieve_one_context(user_id: str):
    logger.info(f"Retrieving context for user {user_id}")
    return await get_one_context(user_id)


@router.get("/api/contexts/{user_id}", response_model=List[ContextModel])
async def retrieve_contexts(user_id: str):
    logger.info(f"Retrieving all contexts for user {user_id}")
    return await get_contexts(user_id)
