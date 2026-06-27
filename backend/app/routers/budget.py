from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.services.budget_service import get_budget, set_budget

router = APIRouter(prefix="/budget", tags=["Budget"])


@router.get("/")
def read_budget(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    budget = get_budget(db, current_user.id)

    if not budget:
        return {"monthly_budget": 0}

    return {"monthly_budget": budget.monthly_budget}


@router.post("/")
def create_budget(
    amount: float, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    budget = set_budget(db, current_user.id, amount)

    return {"monthly_budget": budget.monthly_budget}
