import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json"
    }
});

// ================= Upload =================

export const uploadDataset = async (formData) => {
    const response = await api.post(
        "/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

// ================= Summary =================

export const getSummary = async (filename) => {

    const response = await api.post("/summary", {
        filename
    });

    return response.data;
};

// ================= Clean =================

export const cleanDataset = async (filename) => {

    const response = await api.post("/clean", {
        filename
    });

    return response.data;
};

// ================= Train =================

export const trainModel = async (
    filename,
    target
) => {

    const response = await api.post("/train", {

        filename,

        target

    });

    return response.data;
};

// ================= Predict =================

export const predict = async (filename) => {

    const response = await api.post("/predict", {

        filename

    });

    return response.data;
};

// ================= PCA =================

export const performPCA = async (filename) => {

    const response = await api.post("/pca", {

        filename

    });

    return response.data;
};

// ================= Report =================

export const generateReport = async () => {

    const response = await api.post("/report");

    return response.data;
};
export const downloadPredictions = async () => {

    const response = await api.get(

        "/download/predictions",

        {

            responseType:"blob"

        }

    );

    return response.data;

};
export const downloadReport = async()=>{

    const response=await api.get(

        "/download/report",

        {

            responseType:"blob"

        }

    );

    return response.data;

};
export const getModelInfo = async () => {

    const response = await api.get("/model-info");

    return response.data;

};
export const downloadModel = () => {

    window.open(

        "http://127.0.0.1:8000/download/model",

        "_blank"

    );

};


export default api;