from fastapi import APIRouter
import joblib

from app.schemas.anomaly import (
    AnomalyRequest,
    AnomalyResponse
)

router = APIRouter(
    prefix="/anomaly",
    tags=["Anomaly Detection"]
)

model = joblib.load(
    "app/ml/models/anomaly_detector.pkl"
)


@router.post(
    "/check",
    response_model=AnomalyResponse
)
def detect_anomaly(
    request: AnomalyRequest
):

    prediction = model.predict(
        [[request.amount]]
    )[0]

    return {
        "amount": request.amount,
        "anomaly": prediction == -1
    }