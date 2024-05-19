from fastapi import APIRouter

from app.router.api.books import books
from app.router.api.trends import trends

router = APIRouter(prefix="/api")
router.include_router(books.router)
router.include_router(trends.router)
