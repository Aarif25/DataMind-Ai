import os
import json
import joblib
import pandas as pd


async def predict(file):

    # ============================
    # Load Metadata
    # ============================

    metadata_path = os.path.join(
        "results",
        "model_metadata.json"
    )

    if not os.path.exists(metadata_path):
        return {
            "status": "error",
            "message": "No trained model found. Train a model first."
        }

    with open(metadata_path, "r") as f:
        metadata = json.load(f)

    # ============================
    # Load Best Model
    # ============================

    model_path = os.path.join(
        "trained_models",
        metadata["best_model"]
    )

    if not os.path.exists(model_path):
        return {
            "status": "error",
            "message": "Best model file not found."
        }

    model = joblib.load(model_path)

    # ============================
    # Load Preprocessor
    # ============================

    preprocessor_path = os.path.join(
        "trained_models",
        metadata["preprocessor"]
    )

    if not os.path.exists(preprocessor_path):
        return {
            "status": "error",
            "message": "Preprocessor not found."
        }

    preprocessor = joblib.load(preprocessor_path)

    # ============================
    # Load Label Encoder (if classification with string targets)
    # ============================
    
    label_encoder = None
    if metadata.get("problem_type") == "classification" and "label_encoder" in metadata:
        label_encoder_path = os.path.join(
            "trained_models",
            metadata["label_encoder"]
        )
        if os.path.exists(label_encoder_path):
            label_encoder = joblib.load(label_encoder_path)

    # ============================
    # Read Uploaded CSV
    # ============================

    try:

        original_df = pd.read_csv(file.file)

    except Exception as e:

        return {
            "status": "error",
            "message": f"Unable to read CSV: {str(e)}"
        }

    # Keep a copy for prediction output
    prediction_df = original_df.copy()

    # ============================
    # Prepare Features
    # ============================

    try:

        target = metadata["target"]

        X = original_df.copy()

        if target in X.columns:
            X = X.drop(columns=[target])

        X = preprocessor.transform(X)

    except Exception as e:

        return {
            "status": "error",
            "message": f"Preprocessing failed: {str(e)}"
        }

    # ============================
    # Predict
    # ============================

    try:

        predictions = model.predict(X)

    except Exception as e:

        return {
            "status": "error",
            "message": f"Prediction failed: {str(e)}"
        }

    # ============================
    # Decode Predictions (if classification with string targets)
    # ============================
    
    if label_encoder is not None:
        predictions = label_encoder.inverse_transform(predictions)

    # ============================
    # Attach Predictions
    # ============================

    prediction_df["Prediction"] = predictions

    # ============================
    # Save CSV
    # ============================

    os.makedirs(
        "predictions",
        exist_ok=True
    )

    prediction_file = "predictions.csv"

    prediction_path = os.path.join(
        "predictions",
        prediction_file
    )

    prediction_df.to_csv(
        prediction_path,
        index=False
    )

    # ============================
    # Response
    # ============================

    preview = prediction_df.head(20).to_dict(
        orient="records"
    )

    return {

        "status": "success",

        "rows": len(prediction_df),

        "prediction_file": prediction_file,

        "prediction_path": prediction_path,

        "preview": preview,

        "predictions": preview

    }