import json
import os

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from xgboost import XGBClassifier, XGBRegressor

from services.evaluation import evaluate_classification, evaluate_regression
from services.feature_importance import get_feature_importance
from services.preprocess import prepare_feature_frame
from services.cross_validation import perform_cross_validation
from services.hyperparameter_tuning import tune_model
from services.recommendation_engine import recommend_model






def _build_preprocessor(feature_frame):
    numerical_columns = feature_frame.select_dtypes(include=["number"]).columns.tolist()
    categorical_columns = feature_frame.select_dtypes(exclude=["number"]).columns.tolist()

    transformers = []

    if numerical_columns:
        numerical_pipeline = Pipeline(
            [
                ("imputer", SimpleImputer(strategy="median")),
                ("scaler", StandardScaler()),
            ]
        )
        transformers.append(("num", numerical_pipeline, numerical_columns))

    if categorical_columns:
        categorical_pipeline = Pipeline(
            [
                ("imputer", SimpleImputer(strategy="most_frequent")),
                ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
            ]
        )
        transformers.append(("cat", categorical_pipeline, categorical_columns))

    return ColumnTransformer(transformers, remainder="drop")


def train_models(filename, target):
    file_path = os.path.join("uploads", filename)

    if not os.path.exists(file_path):
        return {"status": "error", "message": f"Dataset '{filename}' was not found in uploads."}

    df = pd.read_csv(file_path)

    if target not in df.columns:
        return {"status": "error", "message": f"{target} column not found."}

    X = prepare_feature_frame(df.drop(columns=[target]))
    y = df[target]
    mask = y.notna()

    X = X[mask].reset_index(drop=True)
    y = y[mask].reset_index(drop=True)

    if len(y) == 0:
        return {
            "status": "error",
            "message": "Target column contains only missing values."
        }

    if X.empty:
        return {"status": "error", "message": "The selected target leaves no feature columns to train on."}

    label_encoder = None
    original_classes = None
    
    if y.dtype == "object":
        problem_type = "classification"
        # Encode string targets to numeric values
        label_encoder = LabelEncoder()
        y = label_encoder.fit_transform(y)
        original_classes = label_encoder.classes_.tolist()
        models = {
            "Logistic Regression": LogisticRegression(max_iter=1000),
            "Decision Tree": DecisionTreeClassifier(random_state=42),
            "Random Forest": RandomForestClassifier(random_state=42),
            "XGBoost": XGBClassifier(random_state=42, eval_metric="logloss"),
        }
    else:
        problem_type = "regression"
        models = {
            "Linear Regression": LinearRegression(),
            "Decision Tree": DecisionTreeRegressor(random_state=42),
            "Random Forest": RandomForestRegressor(random_state=42),
            "XGBoost": XGBRegressor(random_state=42),
        }

    test_size = max(0.2, min(0.5, 2 / len(y)))
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=42,
        stratify=y if problem_type == "classification" else None,
    )

    preprocessor = _build_preprocessor(X)
    preprocessor.fit(X_train)

    X_train_processed = preprocessor.transform(X_train)
    X_test_processed = preprocessor.transform(X_test)

    results = []
    leaderboard = []
    best_model = None
    best_score = float("-inf")
    best_name = ""

    for name, model in models.items():
        model.fit(X_train_processed, y_train)
        predictions = model.predict(X_test_processed)

        if problem_type == "classification":
            metrics = evaluate_classification(y_test, predictions)
            score = metrics["accuracy"]
        else:
            metrics = evaluate_regression(y_test, predictions)
            score = metrics["r2_score"]

        model_result = {"model": name, **metrics}
        results.append(model_result)
        leaderboard.append(model_result)

        if score > best_score:
            best_score = score
            best_model = model
            best_name = name

    if best_model is None:
        return {"status": "error", "message": "No model could be trained."}

    preprocessor.fit(X)
    X_processed = preprocessor.transform(X)
    best_model.fit(X_processed, y)



    cross_validation = perform_cross_validation(
        best_model,
        X_processed,
        y,
        problem_type
    )
    with open(
        "results/cross_validation.json",
        "w"
    ) as f:
        json.dump(
            cross_validation,
            f,
            indent=4
        )

    tuning_result = tune_model(
        best_model,
        X_processed,
        y,
        problem_type
    )

    if tuning_result is not None:

        best_model = tuning_result["best_model"]

        best_params = tuning_result["best_params"]

        tuning_score = tuning_result["best_score"]

    else:

        best_params = {}

        tuning_score = None

    with open(
        "results/hyperparameter_tuning.json",
        "w"
    ) as f:

        json.dump(
            {
                "best_params": best_params,
                "best_score": tuning_score
            },
            f,
            indent=4
        ) 
    recommendation = recommend_model(
        leaderboard,
        cross_validation,
        tuning_result,
        problem_type
    )
    with open(
        "results/recommendation.json",
        "w"
    ) as f:

        json.dump(
            recommendation,
            f,
            indent=4
        )







    feature_names = list(preprocessor.get_feature_names_out())
    feature_importance = None
    if problem_type == "classification":
        leaderboard.sort(key=lambda x: x["accuracy"], reverse=True)
        feature_importance = get_feature_importance(best_model, feature_names)
    else:
        leaderboard.sort(key=lambda x: x["r2_score"], reverse=True)
        feature_importance = get_feature_importance(best_model, feature_names)

    os.makedirs("trained_models", exist_ok=True)
    os.makedirs("results", exist_ok=True)

    model_path = os.path.join("trained_models", "best_model.pkl")
    preprocessor_path = os.path.join("trained_models", "preprocessor.pkl")

    joblib.dump(best_model, model_path)
    joblib.dump(preprocessor, preprocessor_path)

    metadata = {
        "target": target,
        "problem_type": problem_type,
        "feature_columns": X.columns.tolist(),
        "best_model": os.path.basename(model_path),
        "preprocessor": os.path.basename(preprocessor_path),
    }
    
    # Save label encoder if classification problem with string targets
    if problem_type == "classification" and label_encoder is not None:
        label_encoder_path = os.path.join("trained_models", "label_encoder.pkl")
        joblib.dump(label_encoder, label_encoder_path)
        metadata["label_encoder"] = os.path.basename(label_encoder_path)
        metadata["original_classes"] = original_classes

    with open("results/model_metadata.json", "w", encoding="utf-8") as handle:
        json.dump(metadata, handle, indent=4)

    result = {
        "problem_type": problem_type,
        "target": target,
        "leaderboard": leaderboard,
        "feature_importance": feature_importance,
        "best_model": {"name": best_name, "score": round(best_score, 4)},
    }

    with open("results/training_results.json", "w", encoding="utf-8") as handle:
        json.dump(result, handle, indent=4)

    with open("results/feature_importance.json", "w", encoding="utf-8") as handle:
        json.dump(feature_importance, handle, indent=4)

    return {
        "status": "success",
        "message": "Models trained and best model saved.",
        **result,
        "hyperparameter_tuning": {
            "best_params": best_params,
            "best_score": tuning_score
        },
        "cross_validation": cross_validation,
        "recommendation": recommendation
    }
