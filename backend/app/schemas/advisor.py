from pydantic import BaseModel


class AdvisorResponse(BaseModel):
    advice: list[str]