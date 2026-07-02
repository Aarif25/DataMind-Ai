from fastapi import APIRouter
from pydantic import BaseModel
import os

from services.clean_data import clean_dataset

router = APIRouter()


class CleanRequest(BaseModel):
    filename: str


@router.post("/clean")
def clean(request: CleanRequest):

    file_path = os.path.join(
        "uploads",
        request.filename
    )

    return clean_dataset(file_path)