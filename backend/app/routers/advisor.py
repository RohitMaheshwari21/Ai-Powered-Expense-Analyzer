from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.core.dependencies import get_current_user

from app.services.advisor_service import generate_advice

router = APIRouter(prefix="/advisor", tags=["AI Advisor"])


@router.get("/")
def get_advice(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    advice = generate_advice(db, int(current_user.id))

    return {"advice": advice}
