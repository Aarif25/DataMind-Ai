import pandas as pd


def get_feature_importance(model, feature_names):

    if not hasattr(model, "feature_importances_"):
        return None

    importance = model.feature_importances_

    feature_data = []

    for feature, score in zip(feature_names, importance):

        feature_data.append({
            "feature": feature,
            "importance": round(float(score), 4)
        })

    feature_data.sort(
        key=lambda x: x["importance"],
        reverse=True
    )

    return feature_data[:10]