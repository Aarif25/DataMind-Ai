from sklearn.model_selection import cross_val_score

import numpy as np


def perform_cross_validation(
    model,
    X,
    y,
    problem_type
):

    if problem_type == "classification":

        scores = cross_val_score(
            model,
            X,
            y,
            cv=5,
            scoring="accuracy"
        )

    else:

        scores = cross_val_score(
            model,
            X,
            y,
            cv=5,
            scoring="r2"
        )

    return {

        "fold_scores":[
            round(float(score),4)
            for score in scores
        ],

        "mean_score":round(
            float(np.mean(scores)),
            4
        ),

        "std":round(
            float(np.std(scores)),
            4
        )

    }