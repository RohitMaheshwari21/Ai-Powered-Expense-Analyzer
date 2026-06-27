from pydantic import BaseModel
from datetime import date


class ExpenseCreate(BaseModel):
    title: str
    amount: float
    expense_date: date

class ExpenseUpdate(BaseModel):
    title: str
    amount: float
    expense_date: date

class ExpenseResponse(BaseModel):
    id: int
    title: str
    category: str
    amount: float
    expense_date: date

    class Config:
        from_attributes = True