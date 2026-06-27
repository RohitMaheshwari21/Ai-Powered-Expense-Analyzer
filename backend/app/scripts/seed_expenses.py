from datetime import date
import random

from app.database.database import SessionLocal
from app.models.expense import Expense
from app.models.user import User

db = SessionLocal()

titles = {
    "Food": [
        "Pizza Hut",
        "KFC",
        "McDonalds",
        "Restaurant Dinner",
        "Grocery Shopping"
    ],
    "Transport": [
        "Uber Ride",
        "Bus Ticket",
        "Fuel",
        "Careem Ride"
    ],
    "Entertainment": [
        "Netflix Subscription",
        "Cinema Ticket",
        "Spotify Premium"
    ],
    "Shopping": [
        "Clothes",
        "Shoes",
        "Amazon Purchase"
    ],
    "Bills": [
        "Electricity Bill",
        "Internet Bill",
        "Gas Bill"
    ],
    "Education": [
        "Course Fee",
        "Books",
        "Udemy Course"
    ],
    "Healthcare": [
        "Medicine",
        "Doctor Visit",
        "Lab Test"
    ]
}

months = [1, 2, 3, 4, 5, 6]

for _ in range(100):

    category = random.choice(
        list(titles.keys())
    )

    title = random.choice(
        titles[category]
    )

    expense = Expense(
        title=title,
        category=category,
        amount=random.randint(
            500,
            15000
        ),
        expense_date=date(
            2026,
            random.choice(months),
            random.randint(1, 28)
        ),
        user_id=1
    )

    db.add(expense)

db.commit()

print("100 expenses inserted successfully")