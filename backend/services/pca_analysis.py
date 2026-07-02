import os
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler


def perform_pca(file_path):

    # Read dataset
    df = pd.read_csv(file_path)

    # Keep only numerical columns
    numerical_df = df.select_dtypes(include=["number"])

    if numerical_df.shape[1] < 2:
        return {
            "status": "error",
            "message": "Dataset must contain at least two numerical columns."
        }

    # Standardize data
    scaler = StandardScaler()

    scaled_data = scaler.fit_transform(numerical_df)

    # Create output directory
    graph_dir = os.path.join("results", "graphs")
    os.makedirs(graph_dir, exist_ok=True)

    # ==========================
    # PCA (2 Components)
    # ==========================

    pca_2d = PCA(n_components=2)

    pca_2d_result = pca_2d.fit_transform(scaled_data)

    plt.figure(figsize=(8, 6))

    plt.scatter(
        pca_2d_result[:, 0],
        pca_2d_result[:, 1]
    )

    plt.xlabel("Principal Component 1")
    plt.ylabel("Principal Component 2")
    plt.title("2D PCA")

    pca2_path = os.path.join(
        graph_dir,
        "pca_2d.png"
    )

    plt.savefig(pca2_path)

    plt.close()

    # ==========================
    # PCA (3 Components)
    # ==========================

    pca3_path = None

    if numerical_df.shape[1] >= 3:

        pca_3d = PCA(n_components=3)

        pca_3d_result = pca_3d.fit_transform(
            scaled_data
        )

        fig = plt.figure(figsize=(8, 6))

        ax = fig.add_subplot(
            111,
            projection="3d"
        )

        ax.scatter(
            pca_3d_result[:, 0],
            pca_3d_result[:, 1],
            pca_3d_result[:, 2]
        )

        ax.set_xlabel("PC1")
        ax.set_ylabel("PC2")
        ax.set_zlabel("PC3")

        ax.set_title("3D PCA")

        pca3_path = os.path.join(
            graph_dir,
            "pca_3d.png"
        )

        plt.savefig(pca3_path)

        plt.close()

    # ==========================
    # Explained Variance
    # ==========================

    variance = pca_2d.explained_variance_ratio_

    plt.figure(figsize=(6, 5))

    plt.bar(
        ["PC1", "PC2"],
        variance
    )

    plt.ylabel("Explained Variance")

    plt.title("Explained Variance Ratio")

    variance_path = os.path.join(
        graph_dir,
        "explained_variance.png"
    )

    plt.savefig(
        variance_path
    )

    plt.close()

    return {

        "status": "success",

        "components": 2,

        "explained_variance": [
            round(float(v), 4)
            for v in variance
        ],

        "total_variance": round(
            float(sum(variance)),
            4
        ),

        "graphs": {

            "pca_2d": pca2_path,

            "pca_3d": pca3_path,

            "explained_variance": variance_path

        }

    }