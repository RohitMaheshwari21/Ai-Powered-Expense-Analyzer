from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.expense import Expense

from app.services.ai_service import generate_insights
from app.services.dashboard_service import (
    get_total_spending,
    get_category_spending,
    get_monthly_spending,
    get_total_expenses,
    get_top_category,
    get_recent_expenses,
)

from app.core.dependencies import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/total-spending")
def total_spending(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    total = get_total_spending(db, current_user.id)

    return {"total_spending": total}


@router.get("/category-spending")
def category_spending(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return get_category_spending(db, current_user.id)


@router.get("/monthly-spending")
def monthly_spending(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return get_monthly_spending(db, current_user.id)


@router.get("/total-expenses")
def total_expenses(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return {"total_expenses": get_total_expenses(db, current_user.id)}


@router.get("/top-category")
def top_category(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return get_top_category(db, current_user.id)


@router.get("/recent-expenses")
def recent_expenses(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return get_recent_expenses(db, current_user.id)


@router.get("/ai-insights")
def ai_insights(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    expenses = db.query(Expense).filter(Expense.user_id == current_user.id).all()

    return {"insights": generate_insights(expenses)}
