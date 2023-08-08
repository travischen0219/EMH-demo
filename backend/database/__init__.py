import os

from dotenv import load_dotenv
from pymongo import MongoClient

from utils.logger import logger

dotenv_path = f".env.{os.getenv('ENV_MODE')}" if os.getenv("ENV_MODE") != "" else ".env"
logger.info(f"Retrieving context for user {dotenv_path}")

load_dotenv(dotenv_path=dotenv_path)

client = MongoClient(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),  # port should be integer
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)
db = client[os.getenv("DB_NAME")]
collection = db[os.getenv("DB_COLLECTION")]
