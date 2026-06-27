from pydantic import BaseModel


class AnomalyRequest(BaseModel):
    amount: float


class AnomalyResponse(BaseModel):
    amount: float
    anomaly: bool