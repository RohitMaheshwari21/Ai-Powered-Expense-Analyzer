from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.models.user import User
from app.models.expense import Expense
from app.models.budget import Budget

from app.routers.ml import router as ml_router
from app.routers.auth import router as auth_router
from app.routers.expense import router as expense_router
from app.routers.forecast import router as forecast_router
from app.routers.anomaly import router as anomaly_router
from app.routers.voice import router as voice_router

from app.routers.chat import router as chat_router
from app.routers.budget import router as budget_router

from app.routers.advisor import router as advisor_router

from app.routers.dashboard import router as dashboard_router
from app.routers.users import router as users_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Expense Analyzer")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(expense_router)
app.include_router(ml_router)
app.include_router(dashboard_router)
app.include_router(forecast_router)
app.include_router(anomaly_router)
app.include_router(advisor_router)
app.include_router(voice_router)
app.include_router(chat_router)
app.include_router(budget_router)
app.include_router(users_router)


@app.get("/")
def home():
    return {"message": "AI Expense Analyzer Running"}
