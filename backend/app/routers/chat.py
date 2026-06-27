from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.chat import ChatRequest

from app.services.chat_service import ask_financial_assistant

from app.models.expense import Expense

router = APIRouter(prefix="/chat", tags=["Chatbot"])


@router.post("/")
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    expenses = db.query(Expense).filter(Expense.user_id == int(current_user.id)).all()

    total_spending = 0
    category_totals = {}
    context = ""

    for expense in expenses:

        total_spending += expense.amount

        if expense.category not in category_totals:
            category_totals[expense.category] = 0

        category_totals[expense.category] += expense.amount

        context += f"{expense.title} | " f"{expense.category} | " f"{expense.amount}\n"

    summary = f"Total Spending: Rs. {total_spending}\n\n"

    summary += "Category Summary:\n"

    for category, amount in category_totals.items():
        summary += f"{category}: Rs. {amount}\n"

    if category_totals:
        highest_category = max(category_totals, key=category_totals.get)

        summary += (
            f"\nHighest Spending Category: "
            f"{highest_category}"
            f" (Rs. {category_totals[highest_category]})\n\n"
        )

    final_context = summary + "\nExpense Records:\n" + context

    answer = ask_financial_assistant(final_context, request.question)

    return {"answer": answer}
