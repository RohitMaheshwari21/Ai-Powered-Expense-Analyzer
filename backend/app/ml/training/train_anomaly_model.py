import pandas as pd
import joblib

from sklearn.ensemble import IsolationForest

data = {
    "amount": [
        500,
        700,
        800,
        1200,
        1500,
        2000,
        2500,
        3000,
        3500,
        4000,
        50000,
        100000
    ]
}

df = pd.DataFrame(data)

model = IsolationForest(
    contamination=0.15,
    random_state=42
)

model.fit(df[["amount"]])

joblib.dump(
    model,
    "app/ml/models/anomaly_detector.pkl"
)

print("Anomaly model trained successfully")