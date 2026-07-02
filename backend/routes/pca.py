from fastapi import APIRouter
from pydantic import BaseModel
import os

from services.pca_analysis import perform_pca

router = APIRouter()


class PCARequest(BaseModel):
    filename: str


@router.post("/pca")
def pca(request: PCARequest):

    file_path = os.path.join(
        "processed",
        request.filename
    )

    return perform_pca(file_path)