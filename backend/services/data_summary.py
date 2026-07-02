import os
import pandas as pd
from services.recommendations import generate_recommendations



def get_data_summary(file_path):
  
   
   

    df = pd.read_csv(file_path)
    recommendations = generate_recommendations(df)
    # Dataset shape
    rows, columns = df.shape

    # Memory usage
    memory_usage = round(df.memory_usage(deep=True).sum() / (1024 * 1024), 2)

    # Column information
    column_info = {}

    for column in df.columns:
        column_info[column] = {
            "dtype": str(df[column].dtype),
            "missing_values": int(df[column].isnull().sum()),
            "unique_values": int(df[column].nunique())
        }

    summary = {
        "filename": os.path.basename(file_path),

        "rows": rows,
        "columns": columns,

        "memory_usage": f"{memory_usage} MB",

        "missing_values": int(df.isnull().sum().sum()),

        "duplicate_rows": int(df.duplicated().sum()),

        "numerical_columns": df.select_dtypes(
            include=["number"]
        ).columns.tolist(),

        "categorical_columns": df.select_dtypes(
            exclude=["number"]
        ).columns.tolist(),

        "column_info": column_info,

        "statistics": df.describe(
            include="all"
        ).fillna("").to_dict(),

        "sample_data": df.head(10)
            .fillna("")
            .to_dict(orient="records"),

        "recommendations": recommendations,

        "columns_list": list(df.columns)
   }

    return summary