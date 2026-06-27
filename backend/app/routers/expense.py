from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.ml.prediction.predict_category import predict_category

from app.schemas.expense import ExpenseCreate, ExpenseUpdate

from app.services.expense_service import (
    create_expense,
    get_expenses,
    update_expense,
    delete_expense,
)

router = APIRouter(prefix="/expenses", tags=["Expenses"])


@router.post("/")
def add_expense(
    request: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    predicted_category = predict_category(request.title)

    expense = create_expense(
        db=db,
        user_id=current_user.id,
        title=request.title,
        category=predicted_category,
        amount=request.amount,
        expense_date=request.expense_date,
    )

    return expense


@router.get("/")
def list_expenses(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return get_expenses(db, current_user.id)


@router.put("/{expense_id}")
def edit_expense(
    expense_id: int,
    request: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    expense = update_expense(
        db=db, expense_id=expense_id, user_id=current_user.id, data=request
    )

    if not expense:
        return {"message": "Expense not found"}

    return expense


@router.delete("/{expense_id}")
def remove_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_expense(db=db, expense_id=expense_id, user_id=current_user.id)

    if not result:
        return {"message": "Expense not found"}

    return result
