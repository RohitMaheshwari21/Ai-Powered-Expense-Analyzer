from app.ml.prediction.predict_category import (
    predict_category
)
from sqlalchemy.orm import Session

from app.models.expense import Expense


def create_expense(
    db: Session,
    user_id: int,
    title: str,
    category: str,
    amount: float,
    expense_date
):
    expense = Expense(
        user_id=user_id,
        title=title,
        category=category,
        amount=amount,
        expense_date=expense_date
    )

    db.add(expense)

    db.commit()

    db.refresh(expense)

    return expense


def get_expenses(
    db: Session,
    user_id: int
):
    return db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()

def update_expense(
    db,
    expense_id,
    user_id,
    data
):
    expense = (
        db.query(Expense)
        .filter(
            Expense.id == expense_id,
            Expense.user_id == user_id
        )
        .first()
    )

    if not expense:
        return None

    expense.title = data.title

    expense.category = predict_category(
        data.title
    )

    expense.amount = data.amount

    expense.expense_date = data.expense_date

    db.commit()
    db.refresh(expense)

    return expense

def delete_expense(
    db,
    expense_id,
    user_id
):
    expense = (
        db.query(Expense)
        .filter(
            Expense.id == expense_id,
            Expense.user_id == user_id
        )
        .first()
    )

    if not expense:
        return None

    db.delete(expense)
    db.commit()

    return {
        "message": "Expense deleted successfully"
    }