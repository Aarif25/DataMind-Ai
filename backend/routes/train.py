from fastapi import APIRouter
from pydantic import BaseModel

from services.train_model import train_models

router = APIRouter()


class TrainRequest(BaseModel):
    filename: str
    target: str


@router.post("/train")
def train(request: TrainRequest):

    return train_models(
        request.filename,
        request.target
    )