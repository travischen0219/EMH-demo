from fastapi import FastAPI

from middlewares import cors
from routes import context
from utils.logger import CustomizeLogger


def create_app() -> FastAPI:
    app = FastAPI(title="CustomLogger", debug=False)
    logger = CustomizeLogger.make_logger()
    app.logger = logger

    app.include_router(context.router)
    app = cors.add_middleware(app)

    return app


app = create_app()


@app.on_event("startup")
async def startup_event():
    app.logger.info("Starting up application...")


@app.on_event("shutdown")
async def shutdown_event():
    app.logger.info("Shutting down application...")
