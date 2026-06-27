import pandas as pd
import joblib

from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

df = pd.read_csv(
    "../dataset/expenses_dataset.csv"
)

X = df["title"]
y = df["category"]

model = Pipeline([
    (
        "tfidf",
        TfidfVectorizer()
    ),
    (
        "classifier",
        MultinomialNB()
    )
])

model.fit(X, y)

joblib.dump(
    model,
    "../models/expense_classifier.pkl"
)

print("Model trained successfully")