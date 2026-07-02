from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

router = APIRouter()

@router.get("/download/predictions")
def download_predictions():

    path = os.path.join(
        "predictions",
        "predictions.csv"
    )

    return FileResponse(
        path=path,
        filename="predictions.csv",
        media_type="text/csv"
    )

@router.get("/download/report")
def download_report():

    path=os.path.join(

        "results",

        "report.pdf"

    )

    return FileResponse(

        path,

        filename="report.pdf",

        media_type="application/pdf"

    )