from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.expense import Expense


def get_total_spending(db: Session, user_id: int):
    total = (
        db.query(func.sum(Expense.amount)).filter(Expense.user_id == user_id).scalar()
    )

    return total or 0


def get_category_spending(db: Session, user_id: int):
    results = (
        db.query(Expense.category, func.sum(Expense.amount))
        .filter(Expense.user_id == user_id)
        .group_by(Expense.category)
        .all()
    )

    return [{"category": row[0], "total": float(row[1])} for row in results]


def get_monthly_spending(db: Session, user_id: int):
    expenses = db.query(Expense).filter(Expense.user_id == user_id).all()

    monthly_data = {}

    for expense in expenses:
        month = expense.expense_date.strftime("%Y-%m")

        if month not in monthly_data:
            monthly_data[month] = 0

        monthly_data[month] += float(expense.amount)

    return [{"month": month, "total": total} for month, total in monthly_data.items()]


def get_total_expenses(db: Session, user_id: int):
    return db.query(Expense).filter(Expense.user_id == user_id).count()


def get_top_category(db: Session, user_id: int):
    result = (
        db.query(Expense.category, func.sum(Expense.amount))
        .filter(Expense.user_id == user_id)
        .group_by(Expense.category)
        .order_by(func.sum(Expense.amount).desc())
        .first()
    )

    if not result:
        return {"category": "N/A", "total": 0}

    return {"category": result[0], "total": float(result[1])}


def get_recent_expenses(db: Session, user_id: int):
    expenses = (
        db.query(Expense)
        .filter(Expense.user_id == user_id)
        .order_by(Expense.id.desc())
        .limit(5)
        .all()
    )

    return [
        {
            "title": expense.title,
            "category": expense.category,
            "amount": float(expense.amount),
            "date": expense.expense_date,
        }
        for expense in expenses
    ]
