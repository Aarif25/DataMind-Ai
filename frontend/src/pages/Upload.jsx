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
      <div className="rounded-[32px] border border-[#a97d53]/30 bg-[#361c22]/80 p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.45)] backdrop-blur sm:p-10">
        <div className="flex items-center gap-3 text-[#c7a965]">
          <div className="rounded-2xl bg-[#4d2a2d] p-2.5 text-[#f2d7a0]">
            <Sparkles size={18} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">Upload your data</p>
        </div>

        <h1 className="mt-5 text-3xl font-semibold text-[#f8ebd5] sm:text-4xl">Bring in your dataset</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#d7b98a]">
          Drop a CSV file into the workspace and let the app prepare it for cleaning, analysis, and model training.
        </p>

        <div
          {...getRootProps()}
          className="mt-8 rounded-[28px] border border-dashed border-[#c7a965]/40 bg-gradient-to-br from-[#3d2228] via-[#2f171b] to-[#3a1f25] p-10 text-center transition hover:border-[#c7a965]/60 hover:shadow-lg"
        >
          <input {...getInputProps()} />
          <UploadCloud size={68} className="mx-auto text-[#c7a965]" />
          <h2 className="mt-6 text-2xl font-semibold text-[#f8ebd5]">Drag & drop your CSV here</h2>
          <p className="mt-2 text-[#d7b98a]">or click to browse from your device</p>
        </div>

        {file && (
          <div className="mt-6 rounded-[24px] border border-[#a97d53]/20 bg-[#3d2228]/70 p-5">
            <h2 className="text-lg font-semibold text-[#f8ebd5]">Selected file</h2>
            <p className="mt-2 text-[#e8dcc8]">{file.name}</p>
            <p className="text-sm text-[#d7b98a]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        {error && <p className="mt-5 text-sm font-medium text-red-400">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-8 inline-flex items-center rounded-2xl bg-gradient-to-r from-[#c7a965] to-[#a97d53] px-6 py-3 font-semibold text-[#2a1418] shadow-lg shadow-[#c7a965]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Uploading..." : "Upload dataset"}
        </button>
      </div>
    </div>
  );
}

export default Upload;