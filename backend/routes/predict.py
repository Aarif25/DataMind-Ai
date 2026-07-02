from fastapi import APIRouter, UploadFile, File, Form
from services.predict import predict

router = APIRouter()

@router.post("/predict")
async def predict_route(file: UploadFile = File(...)):
    """
    Endpoint to make predictions using a trained model.
    """
    # Call the predict function from services/predict.py
    result = await predict(file)
    
    return result