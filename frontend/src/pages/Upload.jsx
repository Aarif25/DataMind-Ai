import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Sparkles } from "lucide-react";
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
    accept: { "text/csv": [".csv"] },
    multiple: false,
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
    } catch (err) {
      console.error(err);
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur sm:p-10">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-2.5 text-white shadow-lg shadow-blue-500/20">
            <Sparkles size={18} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">Upload your data</p>
        </div>

        <h1 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">Bring in your dataset with confidence</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
          Drop a CSV file into the workspace and let the app prepare it for cleaning, analysis, and model training.
        </p>

        <div
          {...getRootProps()}
          className="mt-8 rounded-[28px] border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-10 text-center transition hover:border-blue-400 hover:shadow-lg"
        >
          <input {...getInputProps()} />
          <UploadCloud size={68} className="mx-auto text-blue-600" />
          <h2 className="mt-6 text-2xl font-semibold text-slate-900">Drag & drop your CSV here</h2>
          <p className="mt-2 text-slate-500">or click to browse from your device</p>
        </div>

        {file && (
          <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Selected file</h2>
            <p className="mt-2 text-slate-700">{file.name}</p>
            <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        {error && <p className="mt-5 text-sm font-medium text-red-500">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-8 inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Uploading..." : "Upload dataset"}
        </button>
      </div>
    </div>
  );
}

export default Upload;