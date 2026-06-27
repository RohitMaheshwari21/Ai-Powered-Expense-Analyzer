from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

import shutil
import os

from app.services.voice_service import (
    speech_to_text
)

from app.services.text_parser_service import (
    extract_amount,
    extract_title
)

from app.ml.prediction.predict_category import (
    predict_category
)

router = APIRouter(
    prefix="/voice",
    tags=["Voice"]
)


@router.post("/transcribe")
def transcribe_audio(
    file: UploadFile = File(...)
):
    os.makedirs(
        "uploads",
        exist_ok=True
    )

    file_path = f"uploads/{file.filename}"

    with open(
        file_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    text = speech_to_text(
        file_path
    )

    amount = extract_amount(
        text
    )

    title = extract_title(
        text
    )

    category = predict_category(
        title
    )

    return {
        "transcription": text,
        "title": title,
        "amount": amount,
        "predicted_category": category
    }