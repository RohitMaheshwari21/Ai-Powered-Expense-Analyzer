from sqlalchemy.orm import Session

from app.models.expense import Expense


def generate_advice(
    db: Session,
    user_id: int
):
    expenses = (
        db.query(Expense)
        .filter(Expense.user_id == user_id)
        .all()
    )

    total_food = 0
    total_transport = 0
    total_entertainment = 0

    for expense in expenses:

        if expense.category == "Food":
            total_food += expense.amount

        elif expense.category == "Transport":
            total_transport += expense.amount

        elif expense.category == "Entertainment":
            total_entertainment += expense.amount

    advice = []

    if total_food > 10000:
        advice.append(
            "Your food spending is high."
        )

    if total_entertainment > 10000:
        advice.append(
            "Entertainment expenses are high."
        )

    if total_transport < 5000:
        advice.append(
            "Transport spending is under control."
        )

    if not advice:
        advice.append(
            "Your spending pattern looks balanced."
        )

    return advice