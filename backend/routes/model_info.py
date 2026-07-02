from fastapi import APIRouter
import os
import json

router = APIRouter()

@router.get("/model-info")
def get_model_info():

    training_path = os.path.join(
        "results",
        "training_results.json"
    )

    metadata_path = os.path.join(
        "results",
        "model_metadata.json"
    )

    if not os.path.exists(training_path):
        return {
            "status": "error",
            "message": "No trained model found."
        }

    with open(training_path, "r") as f:
        training = json.load(f)

    with open(metadata_path, "r") as f:
        metadata = json.load(f)

    return {
        "status": "success",

        "best_model": training["best_model"],

        "problem_type": metadata["problem_type"],

        "target": metadata["target"],

        "leaderboard": training["leaderboard"]
    }