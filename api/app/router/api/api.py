from fastapi import APIRouter

from app.router.api.books import books

router = APIRouter(prefix="/api")
router.include_router(books.router)
