from pydantic import BaseModel

class ForecastResponse(BaseModel):
    predicted_expense: float