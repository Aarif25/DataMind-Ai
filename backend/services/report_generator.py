import os
import json
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    PageBreak
)


# ======================================
# Helper Functions
# ======================================

RESULTS_FOLDER = "results"
GRAPH_FOLDER = os.path.join(RESULTS_FOLDER, "graphs")


def load_json(filename):

    path = os.path.join(
        RESULTS_FOLDER,
        filename
    )

    if not os.path.exists(path):
        return {}

    with open(path, "r") as f:
        return json.load(f)


def section_heading(text, styles):

    style = styles["Heading2"]

    return Paragraph(text, style)


def normal(text, styles):

    return Paragraph(text, styles["BodyText"])


def add_table(data):

    table = Table(data)

    table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0F4C81")),

            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

            ("BOTTOMPADDING", (0, 0), (-1, 0), 10),

            ("GRID", (0, 0), (-1, -1), 1, colors.grey),

            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),

            ("ALIGN", (0, 0), (-1, -1), "CENTER")

        ])

    )

    return table


def add_image(path):

    if not os.path.exists(path):
        return None

    image = Image(path)

    image.drawHeight = 4 * inch

    image.drawWidth = 6 * inch

    return image


# ======================================
# Main Report Function
# ======================================

def generate_report():

    os.makedirs(RESULTS_FOLDER, exist_ok=True)

    pdf_path = os.path.join(
        RESULTS_FOLDER,
        "report.pdf"
    )

    doc = SimpleDocTemplate(
        pdf_path
    )

    styles = getSampleStyleSheet()

    styles["Title"].alignment = TA_CENTER

    elements = []

    # ======================================
    # Cover Page
    # ======================================

    elements.append(

        Paragraph(
            "DataMind AI",
            styles["Title"]
        )

    )

    elements.append(
        Spacer(1, 20)
    )

    elements.append(

        Paragraph(
            "Machine Learning Analysis Report",
            styles["Heading1"]
        )

    )

    elements.append(
        Spacer(1, 20)
    )

    elements.append(

        Paragraph(

            f"Generated On : {datetime.now().strftime('%d %B %Y %H:%M')}",

            styles["BodyText"]

        )

    )

    elements.append(
        Spacer(1, 40)
    )

    elements.append(

        Paragraph(

            "This report contains the complete analysis performed by DataMind AI.",

            styles["BodyText"]

        )

    )

    elements.append(
        PageBreak()
    )

    # ======================================
    # Load Results
    # ======================================

    training = load_json(
        "training_results.json"
    )

    recommendation = load_json(
        "recommendation.json"
    )

    metadata = load_json(
        "model_metadata.json"
    )

    cross_validation = load_json(
        "cross_validation.json"
    )

    tuning = load_json(
        "hyperparameter_tuning.json"
    )

    feature_importance = load_json(
        "feature_importance.json"
    )

    # ======================================
    # Dataset Summary
    # ======================================

    elements.append(
        section_heading(
            "Dataset Summary",
            styles
        )
    )

    summary_data = [

        ["Property", "Value"],

        [
            "Problem Type",
            training.get(
                "problem_type",
                "-"
            )
        ],

        [
            "Target Column",
            metadata.get(
                "target",
                "-"
            )
        ],

        [
            "Recommended Model",
            recommendation.get(
                "recommended_model",
                "-"
            )
        ],

        [
            "Confidence",
            str(
                recommendation.get(
                    "confidence",
                    "-"
                )
            )
        ]

    ]

    elements.append(
        add_table(summary_data)
    )

    elements.append(
        Spacer(1, 20)
    )
        # ======================================
    # Training Results
    # ======================================

    elements.append(
        section_heading(
            "Model Training Results",
            styles
        )
    )

    leaderboard = training.get(
        "leaderboard",
        []
    )

    if leaderboard:

        headers = ["Rank", "Model", "Score"]

        table_data = [headers]

        for index, model in enumerate(leaderboard, start=1):

            score = model.get(
                "accuracy",
                model.get("r2_score", "-")
            )

            table_data.append([
                str(index),
                model.get("model", "-"),
                str(score)
            ])

        elements.append(
            add_table(table_data)
        )

    else:

        elements.append(
            normal(
                "No training results available.",
                styles
            )
        )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # Best Model
    # ======================================

    elements.append(
        section_heading(
            "Best Model",
            styles
        )
    )

    best = training.get(
        "best_model",
        {}
    )

    best_data = [

        ["Property", "Value"],

        [
            "Model",
            best.get("name", "-")
        ],

        [
            "Score",
            str(best.get("score", "-"))
        ]

    ]

    elements.append(
        add_table(best_data)
    )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # Cross Validation
    # ======================================

    elements.append(
        section_heading(
            "Cross Validation",
            styles
        )
    )

    if cross_validation:

        cv_data = [

            ["Metric", "Value"],

            [

                "Mean Score",

                str(
                    cross_validation.get(
                        "mean_score",
                        "-"
                    )
                )

            ],

            [

                "Standard Deviation",

                str(
                    cross_validation.get(
                        "std",
                        "-"
                    )
                )

            ]

        ]

        elements.append(
            add_table(cv_data)
        )

        elements.append(
            Spacer(1, 10)
        )

        fold_scores = cross_validation.get(
            "fold_scores",
            []
        )

        if fold_scores:

            fold_table = [

                ["Fold", "Score"]

            ]

            for index, score in enumerate(
                fold_scores,
                start=1
            ):

                fold_table.append([

                    f"Fold {index}",

                    str(score)

                ])

            elements.append(
                add_table(
                    fold_table
                )
            )

    else:

        elements.append(
            normal(
                "Cross validation results not available.",
                styles
            )
        )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # Hyperparameter Tuning
    # ======================================

    elements.append(
        section_heading(
            "Hyperparameter Tuning",
            styles
        )
    )

    if tuning:

        tuning_table = [

            ["Parameter", "Value"]

        ]

        params = tuning.get(
            "best_params",
            {}
        )

        if params:

            for key, value in params.items():

                tuning_table.append([

                    key,

                    str(value)

                ])

            elements.append(
                add_table(
                    tuning_table
                )
            )

            elements.append(
                Spacer(1, 10)
            )

            elements.append(

                normal(

                    f"<b>Best Validation Score:</b> {tuning.get('best_score','-')}",

                    styles

                )

            )

        else:

            elements.append(

                normal(

                    "No hyperparameter tuning was performed.",

                    styles

                )

            )

    else:

        elements.append(

            normal(

                "Hyperparameter tuning data not found.",

                styles

            )

        )

    elements.append(
        PageBreak()
    )
        # ======================================
    # Feature Importance
    # ======================================

    elements.append(
        section_heading(
            "Feature Importance",
            styles
        )
    )

    if feature_importance:

        importance_table = [

            ["Feature", "Importance"]

        ]

        if isinstance(feature_importance, list):

            for feature in feature_importance:

                importance_table.append([

                    str(feature.get("feature", "-")),

                    str(feature.get("importance", "-"))

                ])

        elif isinstance(feature_importance, dict):

            for feature, value in feature_importance.items():

                importance_table.append([

                    str(feature),

                    str(value)

                ])

        elements.append(
            add_table(
                importance_table
            )
        )

    else:

        elements.append(

            normal(

                "Feature importance not available.",

                styles

            )

        )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # Recommendation
    # ======================================

    elements.append(
        section_heading(
            "Model Recommendation",
            styles
        )
    )

    recommendation_table = [

        ["Property", "Value"],

        [

            "Recommended Model",

            recommendation.get(
                "recommended_model",
                "-"
            )

        ],

        [

            "Confidence",

            str(
                recommendation.get(
                    "confidence",
                    "-"
                )
            )

        ]

    ]

    elements.append(
        add_table(
            recommendation_table
        )
    )

    elements.append(
        Spacer(1, 10)
    )

    reasons = recommendation.get(
        "reasons",
        []
    )

    if reasons:

        elements.append(

            Paragraph(

                "<b>Recommendation Reasons</b>",

                styles["Heading3"]

            )

        )

        for reason in reasons:

            elements.append(

                Paragraph(

                    "• " + str(reason),

                    styles["BodyText"]

                )

            )

    else:

        elements.append(

            normal(

                "No recommendation available.",

                styles

            )

        )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # PCA Results
    # ======================================

    elements.append(
        section_heading(
            "Principal Component Analysis (PCA)",
            styles
        )
    )

    pca_results = load_json(
        "pca_results.json"
    )

    if pca_results:

        pca_table = [

            ["Metric", "Value"],

            [

                "Components",

                str(
                    pca_results.get(
                        "components",
                        "-"
                    )
                )

            ],

            [

                "Explained Variance",

                ", ".join(

                    map(

                        str,

                        pca_results.get(
                            "explained_variance",
                            []
                        )

                    )

                )

            ],

            [

                "Total Variance",

                str(

                    pca_results.get(
                        "total_variance",
                        "-"
                    )

                )

            ]

        ]

        elements.append(
            add_table(
                pca_table
            )
        )

    else:

        elements.append(

            normal(

                "PCA analysis has not been performed.",

                styles

            )

        )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # Generated Graphs
    # ======================================

    elements.append(
        section_heading(
            "Generated Visualizations",
            styles
        )
    )

    graph_files = [

        "feature_importance.png",

        "model_comparison.png",

        "cross_validation.png",

        "correlation_heatmap.png",

        "explained_variance.png",

        "pca_2d.png"

    ]

    graphs_added = False

    for graph in graph_files:

        path = os.path.join(

            GRAPH_FOLDER,

            graph

        )

        image = add_image(path)

        if image is not None:

            graphs_added = True

            elements.append(

                Paragraph(

                    graph.replace("_", " ").replace(".png", "").title(),

                    styles["Heading3"]

                )

            )

            elements.append(image)

            elements.append(
                Spacer(1, 20)
            )

    if not graphs_added:

        elements.append(

            normal(

                "No visualization images were found.",

                styles

            )

        )

    elements.append(
        PageBreak()
    )
        # ======================================
    # Executive Summary
    # ======================================

    elements.append(
        section_heading(
            "Executive Summary",
            styles
        )
    )

    summary_lines = [

        f"• Problem Type : {training.get('problem_type', '-')}",

        f"• Target Column : {metadata.get('target', '-')}",

        f"• Recommended Model : {recommendation.get('recommended_model', '-')}",

        f"• Confidence : {recommendation.get('confidence', '-')}",

        f"• Cross Validation Mean : {cross_validation.get('mean_score', '-')}",

        f"• Cross Validation Std : {cross_validation.get('std', '-')}"

    ]

    for line in summary_lines:

        elements.append(
            Paragraph(
                line,
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # Suggestions
    # ======================================

    elements.append(
        section_heading(
            "Recommendations",
            styles
        )
    )

    recommendations = [

        "Use the recommended model for deployment.",

        "Validate predictions using unseen data before production use.",

        "Consider collecting additional data if model performance is unsatisfactory.",

        "Regularly retrain the model as new data becomes available.",

        "Monitor model performance over time."

    ]

    for item in recommendations:

        elements.append(

            Paragraph(

                "• " + item,

                styles["BodyText"]

            )

        )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # Footer
    # ======================================

    elements.append(
        section_heading(
            "End of Report",
            styles
        )
    )

    elements.append(

        Paragraph(

            "This report was automatically generated by DataMind AI.",

            styles["BodyText"]

        )

    )

    elements.append(
        Spacer(1, 12)
    )

    elements.append(

        Paragraph(

            "Generated using FastAPI, Scikit-Learn, XGBoost and ReportLab.",

            styles["Italic"]

        )

    )

    # ======================================
    # Build PDF
    # ======================================

    doc.build(elements)

    return {

        "status": "success",

        "report_path": pdf_path

    }
