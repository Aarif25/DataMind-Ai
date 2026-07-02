from fastapi import APIRouter
from fastapi.responses import FileResponse
import zipfile
import os

router = APIRouter()


@router.get("/download/model")
def download_model():

    os.makedirs("exports", exist_ok=True)

    zip_path = os.path.join(
        "exports",
        "best_model.zip"
    )

    with zipfile.ZipFile(zip_path, "w") as zipf:

        files = [

            "trained_models/best_model.pkl",

            "trained_models/preprocessor.pkl",

            "results/model_metadata.json"

        ]

        for file in files:

            if os.path.exists(file):

                zipf.write(

                    file,

                    arcname=os.path.basename(file)

                )

    return FileResponse(

        path=zip_path,

        filename="best_model.zip",

        media_type="application/zip"

    )