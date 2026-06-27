from sqlalchemy.orm import Session

from app.models.budget import Budget


def get_budget(
    db: Session,
    user_id: int
):
    return (
        db.query(Budget)
        .filter(
            Budget.user_id == user_id
        )
        .first()
    )


def set_budget(
    db: Session,
    user_id: int,
    amount: float
):
    budget = (
        db.query(Budget)
        .filter(
            Budget.user_id == user_id
        )
        .first()
    )

    if budget:

        budget.monthly_budget = amount

    else:

        budget = Budget(
            user_id=user_id,
            monthly_budget=amount
        )

        db.add(budget)

    db.commit()

    db.refresh(budget)

    return budget