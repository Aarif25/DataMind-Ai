from sklearn.model_selection import GridSearchCV


def tune_model(model, X, y, problem_type):

    if problem_type == "classification":

        scoring = "accuracy"

    else:

        scoring = "r2"

    model_name = model.__class__.__name__

    param_grid = {}

    if model_name == "RandomForestClassifier":

        param_grid = {

            "n_estimators": [50, 100, 200],

            "max_depth": [None, 10, 20],

            "min_samples_split": [2, 5]

        }

    elif model_name == "RandomForestRegressor":

        param_grid = {

            "n_estimators": [50, 100, 200],

            "max_depth": [None, 10, 20],

            "min_samples_split": [2, 5]

        }

    else:

        return None

    grid = GridSearchCV(

        estimator=model,

        param_grid=param_grid,

        cv=5,

        scoring=scoring,

        n_jobs=-1

    )

    grid.fit(X, y)

    return {

        "best_model": grid.best_estimator_,

        "best_params": grid.best_params_,

        "best_score": round(grid.best_score_, 4)

    }