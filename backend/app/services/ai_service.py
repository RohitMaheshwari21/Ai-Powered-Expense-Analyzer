from groq import Groq
import os

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_insights(expenses):

    if len(expenses) == 0:
        return [
            "No expenses found."
        ]

    expense_text = ""

    for expense in expenses:

        expense_text += (
            f"Title: {expense.title}, "
            f"Category: {expense.category}, "
            f"Amount: {expense.amount}, "
            f"Date: {expense.expense_date}\n"
        )

    prompt = f"""
You are a financial advisor.

Analyze these expenses and provide:

1. Spending summary
2. Highest spending category
3. Saving suggestions
4. Financial advice

Keep response concise.

Expenses:

{expense_text}
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        result = response.choices[0].message.content

        return result.split("\n")

    except Exception as e:

        return [
            f"AI analysis failed: {str(e)}"
        ]