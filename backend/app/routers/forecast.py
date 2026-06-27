from fastapi import APIRouter
import joblib

from app.schemas.forecast import ForecastResponse

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"]
)

model = joblib.load(
    "app/ml/models/forecast_model.pkl"
)


@router.get(
    "/next-month",
    response_model=ForecastResponse
)
def forecast_next_month():

    prediction = model.predict([[7]])

    return {
        "predicted_expense": float(prediction[0])
    }