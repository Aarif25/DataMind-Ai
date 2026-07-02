import os
import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


def clean_dataset(file_path):

    # Read Dataset
    df = pd.read_csv(file_path)

    rows_before = len(df)
    cols_before = len(df.columns)

    # Remove duplicate rows
    df = df.drop_duplicates()

    # Detect column types
    numerical_columns = df.select_dtypes(include=["number"]).columns
    categorical_columns = df.select_dtypes(exclude=["number"]).columns

    # Numerical Pipeline
    numerical_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])

    # Categorical Pipeline
    categorical_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
    ])

    # Combine Pipelines
    preprocessor = ColumnTransformer([
        ("num", numerical_pipeline, numerical_columns),
        ("cat", categorical_pipeline, categorical_columns)
    ])

    # Fit and Transform
    cleaned_data = preprocessor.fit_transform(df)

    # Get feature names directly from ColumnTransformer
    final_columns = preprocessor.get_feature_names_out()

    # Remove prefixes (num__, cat__)
    final_columns = [
        col.replace("num__", "").replace("cat__", "")
        for col in final_columns
    ]

    # Create DataFrame
    cleaned_df = pd.DataFrame(
        cleaned_data,
        columns=final_columns
    )

    # Create processed folder
    os.makedirs("processed", exist_ok=True)

    cleaned_filename = (
        os.path.splitext(os.path.basename(file_path))[0]
        + "_clean.csv"
    )

    cleaned_path = os.path.join(
        "processed",
        cleaned_filename
    )

    cleaned_df.to_csv(cleaned_path, index=False)

    # Save preprocessor
    os.makedirs("trained_models", exist_ok=True)

    joblib.dump(
        preprocessor,
        os.path.join("trained_models", "preprocessor.pkl")
    )

    return {
        "status": "success",
        "rows_before": rows_before,
        "rows_after": len(cleaned_df),
        "columns_before": cols_before,
        "columns_after": len(cleaned_df.columns),
        "cleaned_file": cleaned_filename,
        "preprocessor_saved": True
    }