def recommend_model(
    leaderboard,
    cross_validation,
    tuning_result,
    problem_type
):

    best = leaderboard[0]

    model = best["model"]

    score = (
        best.get("accuracy")
        if problem_type == "classification"
        else best.get("r2_score")
    )

    reasons = []

    confidence = 70

    if cross_validation["std"] < 0.02:
        reasons.append(
            "Very stable across validation folds."
        )
        confidence += 10

    if cross_validation["mean_score"] > 0.90:
        reasons.append(
            "Excellent average cross validation score."
        )
        confidence += 10

    if tuning_result is not None:
        reasons.append(
            "Hyperparameter tuning improved performance."
        )
        confidence += 5

    if model == "Random Forest":

        reasons.extend([

            "Works well with nonlinear relationships.",

            "Handles mixed feature types effectively.",

            "Resistant to overfitting."

        ])

    elif model == "XGBoost":

        reasons.extend([

            "Excellent algorithm for structured tabular data.",

            "Captures complex feature interactions.",

            "Frequently achieves state-of-the-art performance."

        ])

    elif model == "Decision Tree":

        reasons.extend([

            "Highly interpretable model.",

            "Easy to visualize and explain."

        ])

    elif model == "Logistic Regression":

        reasons.extend([

            "Simple and interpretable baseline model.",

            "Works well when classes are linearly separable."

        ])

    elif model == "Linear Regression":

        reasons.extend([

            "Simple regression baseline.",

            "Easy to interpret coefficients."

        ])

    confidence = min(confidence, 100)

    return {

        "recommended_model": model,

        "score": score,

        "confidence": confidence,

        "reasons": reasons

    }