from pathlib import Path
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "models" / "expense_classifier.pkl"

model = joblib.load(MODEL_PATH)


def predict_category(title: str):
    prediction = model.predict([title])

    return prediction[0]