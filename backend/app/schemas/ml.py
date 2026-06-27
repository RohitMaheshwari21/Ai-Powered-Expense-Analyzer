from pydantic import BaseModel


class CategoryPredictionRequest(BaseModel):
    title: str


class CategoryPredictionResponse(BaseModel):
    category: str