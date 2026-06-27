from fastapi import APIRouter

from app.schemas.ml import (
    CategoryPredictionRequest,
    CategoryPredictionResponse
)

from app.ml.prediction.predict_category import (
    predict_category
)

router = APIRouter(
    prefix="/ml",
    tags=["Machine Learning"]
)


@router.post(
    "/predict-category",
    response_model=CategoryPredictionResponse
)
def predict(request: CategoryPredictionRequest):

    category = predict_category(
        request.title
    )

    return {
        "category": category
    }