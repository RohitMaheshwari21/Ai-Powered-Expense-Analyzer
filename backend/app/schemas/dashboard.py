from pydantic import BaseModel


class TotalSpendingResponse(BaseModel):
    total_spending: float