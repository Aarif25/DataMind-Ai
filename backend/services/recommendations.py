import pandas as pd


def generate_recommendations(df: pd.DataFrame):
    recommendations = []

    # Missing Values
    missing_values = int(df.isnull().sum().sum())

    if missing_values > 0:
        recommendations.append({
            "title": "Handle Missing Values",
            "enabled": True,
            "status": "warning",
            "description": f"{missing_values} missing values detected.",
            "recommendation": "Fill numerical columns using Median and categorical columns using Most Frequent values."
        })

    # Duplicate Rows
    duplicate_rows = int(df.duplicated().sum())

    if duplicate_rows > 0:
        recommendations.append({
            "title": "Remove Duplicate Rows",
            "enabled": True,
            "status": "warning",
            "description": f"{duplicate_rows} duplicate rows found.",
            "recommendation": "Remove duplicate records before training."
        })

    # Categorical Columns
    categorical_columns = df.select_dtypes(exclude=["number"]).columns.tolist()

    if len(categorical_columns) > 0:
        recommendations.append({
            "title": "Encode Categorical Features",
            "enabled": True,
            "status": "info",
            "description": f"{len(categorical_columns)} categorical columns detected.",
            "recommendation": "Apply One-Hot Encoding before model training."
        })

    # Numerical Columns
    numerical_columns = df.select_dtypes(include=["number"]).columns.tolist()

    if len(numerical_columns) > 0:
        recommendations.append({
            "title": "Scale Numerical Features",
            "status": "info",
            "enabled": True,
            "description": f"{len(numerical_columns)} numerical columns detected.",
            "recommendation": "Apply StandardScaler for distance-based algorithms like KNN, SVM, PCA, and K-Means."
        })

    # Constant Columns
    constant_columns = [
        col for col in df.columns
        if df[col].nunique() <= 1
    ]

    if constant_columns:
        recommendations.append({
            "title": "Remove Constant Columns",
            "status": "warning",
            "enabled": True,
            "description": f"{len(constant_columns)} constant column(s) found.",
            "recommendation": "These columns have no predictive value and can be removed.",
            "columns": constant_columns
        })

    # High Missing Percentage
    high_missing = {}

    for column in df.columns:
        percentage = round((df[column].isnull().mean()) * 100, 2)

        if percentage > 30:
            high_missing[column] = percentage

    if high_missing:
        recommendations.append({
            "title": "High Missing Percentage",
            "status": "warning",
            "enabled": True,
            "description": "Some columns contain more than 30% missing values.",
            "recommendation": "Consider dropping these columns or using advanced imputation techniques.",
            "columns": high_missing
        })

    # Target Leakage Warning (Optional)
    object_columns = len(categorical_columns)

    if object_columns > len(df.columns) * 0.6:
        recommendations.append({
            "title": "Many Categorical Features",
            "status": "info",
            "enabled": True,
            "description": "Dataset contains a high proportion of categorical features.",
            "recommendation": "Encoding may significantly increase the number of features."
        })

    # Success Message
    if len(recommendations) == 0:
        recommendations.append({
            "title": "Dataset Looks Good",
            "status": "success",
            "enabled": True,
            "description": "No major preprocessing issues detected.",
            "recommendation": "You can proceed directly to model training."
        })

    return recommendations