import pandas as pd
import joblib

from sklearn.linear_model import LinearRegression

data = {
    "month": [1, 2, 3, 4, 5, 6],
    "expense": [20000, 23000, 25000, 27000, 30000, 32000]
}

df = pd.DataFrame(data)

X = df[["month"]]
y = df["expense"]

model = LinearRegression()

model.fit(X, y)

joblib.dump(
    model,
    "app/ml/models/forecast_model.pkl"
)

print("Forecast model trained successfully")