from fastapi import FastAPI
from routes.upload import router as upload_router
from routes.clean import router as clean_router
from routes.train import router as train_router
from routes.predict import router as predict_router
from routes.pca import router as pca_router
from routes.report import router as report_router
from routes.download import router as download_router
from fastapi.middleware.cors import CORSMiddleware
from routes.download_model import router as download_model_router
from routes.model_info import router as model_info_router


app = FastAPI(
    title="DataMind AI",
    description="An end-to-end Machine Learning Platform",
    version="1.0.0"
)

origins = [
    
    "http://localhost:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(upload_router,prefix ="")
app.include_router(clean_router)
app.include_router(train_router)
app.include_router(predict_router)
app.include_router(pca_router)
app.include_router(report_router)
app.include_router(download_router)
app.include_router(download_model_router)
app.include_router(model_info_router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Welcome to DataMind AI ",
        "version": "1.0.0"
    }