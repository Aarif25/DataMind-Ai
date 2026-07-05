import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { cleanDataset } from "../services/api";
import ProgressBar from "../components/ProgressBar";

function Cleaning() {

    const { dataset, summary } = useContext(AppContext);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [progress, setProgress] = useState(0);

    async function handleCleaning() {

        if (!dataset) return;

        setLoading(true);

        setProgress(10);

        try {

            const interval = setInterval(() => {

                setProgress((prev) => {

                    if (prev >= 90) return prev;

                    return prev + 10;

                });

            }, 200);

            const response = await cleanDataset(dataset.filename);

            clearInterval(interval);

            setProgress(100);

            setResult(response);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="space-y-8">

            <h1 className="text-4xl font-bold text-[#f6e7c8]">

                Data Cleaning

            </h1>

            <div className="rounded-[24px] border border-[#c7a965]/50 bg-[#3d2025]/85 p-6 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.45)] backdrop-blur">

                <h2 className="mb-4 text-xl font-semibold text-[#f6e7c8]">

                    Cleaning Recommendations

                </h2>

                {
    summary?.recommendations?.map((item, index) => (

        <div
            key={index}
            className="mb-4 rounded-2xl border border-[#c7a965]/40 bg-[#f6e7c8]/95 p-4 text-[#4b2a24]"
        >

            <h3 className="text-lg font-semibold text-[#7a2438]">

                {item.title}

            </h3>

            <p className="mt-1 text-sm text-[#6e4b3b]">

                Status: {item.status}

            </p>

            <p className="mt-2">

                {item.description}

            </p>

            <p className="mt-3 font-medium text-[#7a2438]">

                💡 {item.recommendation}

            </p>

        </div>

    ))
}

            </div>

            <div className="rounded-[24px] border border-[#c7a965]/50 bg-[#3d2025]/85 p-6 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.45)] backdrop-blur">

                <h2 className="mb-5 text-xl font-semibold text-[#f6e7c8]">

                    Estimated Dataset

                </h2>

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <p className="text-[#d8c08d]">

                            Rows Before

                        </p>

                        <h2 className="text-3xl font-bold text-[#f6e7c8]">

                            {summary?.rows}

                        </h2>

                    </div>

                    <div>

                        <p className="text-[#d8c08d]">

                            Columns Before

                        </p>

                        <h2 className="text-3xl font-bold text-[#f6e7c8]">

                            {summary?.columns}

                        </h2>

                    </div>

                </div>

            </div>

            <button

                onClick={handleCleaning}

                disabled={loading}

                className="rounded-xl bg-[#7a2438] px-8 py-3 text-white transition hover:bg-[#a24a4a]"

            >

                {

                    loading

                    ? "Cleaning..."

                    : "Clean Dataset"

                }

            </button>

            {

                loading &&

                <ProgressBar progress={progress}/>

            }

            {

                result &&

                <div className="rounded-[24px] border border-[#c7a965]/50 bg-[#f6e7c8]/95 p-6 text-[#4b2a24]">

                    <h2 className="text-2xl font-bold text-[#7a2438]">

                        ✔ Dataset Cleaned Successfully

                    </h2>

                    <div className="grid grid-cols-2 gap-6 mt-6">

                        <div>

                            <p className="text-[#6e4b3b]">Rows Before</p>

                            <h2 className="mt-1 text-xl font-semibold text-[#4b2a24]">{result.rows_before}</h2>

                        </div>

                        <div>

                            <p className="text-[#6e4b3b]">Rows After</p>

                            <h2 className="mt-1 text-xl font-semibold text-[#4b2a24]">{result.rows_after}</h2>

                        </div>

                        <div>

                            <p className="text-[#6e4b3b]">Columns Before</p>

                            <h2 className="mt-1 text-xl font-semibold text-[#4b2a24]">{result.columns_before}</h2>

                        </div>

                        <div>

                            <p className="text-[#6e4b3b]">Columns After</p>

                            <h2 className="mt-1 text-xl font-semibold text-[#4b2a24]">{result.columns_after}</h2>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

}

export default Cleaning;