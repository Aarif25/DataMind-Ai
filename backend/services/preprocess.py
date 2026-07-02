import pandas as pd


def prepare_feature_frame(frame):
    prepared = frame.copy()

    for column in prepared.columns:
        series = prepared[column]

        if pd.api.types.is_numeric_dtype(series):
            continue

        if pd.api.types.is_categorical_dtype(series):
            series = series.astype("string")

        if not pd.api.types.is_object_dtype(series) and not pd.api.types.is_string_dtype(series):
            continue

        cleaned = series.astype("string").str.strip()
        normalized = (
            cleaned.str.replace(r"[$,]", "", regex=True)
            .str.replace("%", "", regex=False)
            .str.replace(r"\(", "-", regex=True)
            .str.replace(r"\)", "", regex=True)
        )
        normalized = normalized.str.replace(r"[^0-9.\-]", "", regex=True)
        normalized = normalized.replace("", pd.NA)
        numeric_values = pd.to_numeric(normalized, errors="coerce")

        non_null_values = numeric_values.notna().sum()
        total_values = series.notna().sum()

        if total_values and non_null_values / total_values >= 0.8:
            prepared[column] = numeric_values.astype(float)

    return prepared
