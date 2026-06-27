from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_financial_assistant(
    context: str,
    question: str
):
    prompt = f"""
You are an intelligent personal finance assistant.

Use the provided expense data to answer accurately.

Provide:
- Spending insights
- Budget recommendations
- Category analysis
- Savings suggestions

Expense Data:
{context}

Question:
{question}

Answer in a clear and professional way.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content