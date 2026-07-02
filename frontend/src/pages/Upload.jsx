import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useDropzone } from "react-dropzone";

import { UploadCloud } from "lucide-react";

import { uploadDataset } from "../services/api";

import { AppContext } from "../context/AppContext";

function Upload() {

    const navigate = useNavigate();

    const { setDataset, setSummary } = useContext(AppContext);

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const onDrop = (acceptedFiles) => {

        if (acceptedFiles.length > 0) {

            setFile(acceptedFiles[0]);

            setError("");

        }

    };

    const { getRootProps, getInputProps } = useDropzone({

        onDrop,

        accept: {

            "text/csv": [".csv"]

        },

        multiple: false

    });

    const handleUpload = async () => {

        if (!file) {

            setError("Please select a CSV file.");

            return;

        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("file", file);

            const result = await uploadDataset(formData);

            setDataset(result);
            setSummary(result);
            localStorage.setItem("dataset", JSON.stringify(result));
            localStorage.setItem("summary", JSON.stringify(result));
            navigate("/summary");

        }

        catch (err) {

            console.error(err);

            setError("Upload failed.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-3xl mx-auto">

            <h1 className="text-4xl font-bold mb-8">

                Upload Dataset

            </h1>

            <div

                {...getRootProps()}

                className="border-2 border-dashed rounded-2xl p-16 bg-white text-center cursor-pointer hover:border-blue-600 transition"

            >

                <input {...getInputProps()} />

                <UploadCloud

                    size={70}

                    className="mx-auto text-blue-600"

                />

                <h2 className="text-2xl font-semibold mt-6">

                    Drag & Drop CSV Here

                </h2>

                <p className="text-gray-500 mt-2">

                    or click to browse

                </p>

            </div>

            {file && (

                <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">

                    <h2 className="font-semibold text-lg">

                        Selected File

                    </h2>

                    <p className="mt-3">

                        {file.name}

                    </p>

                    <p className="text-gray-500">

                        {(file.size / 1024 / 1024).toFixed(2)} MB

                    </p>

                </div>

            )}

            {error && (

                <p className="text-red-500 mt-5">

                    {error}

                </p>

            )}

            <button

                onClick={handleUpload}

                disabled={loading}

                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"

            >

                {

                    loading

                        ? "Uploading..."

                        : "Upload Dataset"

                }

            </button>

        </div>

    );
    
}


export default Upload;