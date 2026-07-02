from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    r2_score,
    mean_absolute_error,
    mean_squared_error
)

import math


def evaluate_classification(y_true, y_pred):

    return {

        "accuracy": round(
            accuracy_score(y_true, y_pred), 4
        ),

        "precision": round(
            precision_score(
                y_true,
                y_pred,
                average="weighted",
                zero_division=0
            ),
            4
        ),

        "recall": round(
            recall_score(
                y_true,
                y_pred,
                average="weighted",
                zero_division=0
            ),
            4
        ),

        "f1_score": round(
            f1_score(
                y_true,
                y_pred,
                average="weighted",
                zero_division=0
            ),
            4
        ),

        "confusion_matrix":
            confusion_matrix(
                y_true,
                y_pred
            ).tolist()
    }


def evaluate_regression(y_true, y_pred):

    mse = mean_squared_error(y_true, y_pred)

    return {

        "r2_score": round(
            r2_score(y_true, y_pred),
            4
        ),

        "mae": round(
            mean_absolute_error(y_true, y_pred),
            4
        ),

        "mse": round(
            mse,
            4
        ),

        "rmse": round(
            math.sqrt(mse),
            4
        )
    }