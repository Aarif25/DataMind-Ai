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

            <h1 className="text-4xl font-bold">

                Data Cleaning

            </h1>

            <div className="bg-white rounded-xl border shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-4">

                    Cleaning Recommendations

                </h2>

                {
    summary?.recommendations?.map((item, index) => (

        <div
            key={index}
            className="border rounded-xl p-4 mb-4 bg-gray-50"
        >

            <h3 className="font-semibold text-lg">

                {item.title}

            </h3>

            <p className="text-sm text-gray-500 mt-1">

                Status: {item.status}

            </p>

            <p className="mt-2">

                {item.description}

            </p>

            <p className="mt-3 text-blue-600 font-medium">

                💡 {item.recommendation}

            </p>

        </div>

    ))
}

            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-5">

                    Estimated Dataset

                </h2>

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <p className="text-gray-500">

                            Rows Before

                        </p>

                        <h2 className="text-3xl font-bold">

                            {summary?.rows}

                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            Columns Before

                        </p>

                        <h2 className="text-3xl font-bold">

                            {summary?.columns}

                        </h2>

                    </div>

                </div>

            </div>

            <button

                onClick={handleCleaning}

                disabled={loading}

                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"

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

                <div className="bg-green-50 border border-green-300 rounded-xl p-6">

                    <h2 className="text-2xl font-bold text-green-700">

                        ✔ Dataset Cleaned Successfully

                    </h2>

                    <div className="grid grid-cols-2 gap-6 mt-6">

                        <div>

                            <p>Rows Before</p>

                            <h2>{result.rows_before}</h2>

                        </div>

                        <div>

                            <p>Rows After</p>

                            <h2>{result.rows_after}</h2>

                        </div>

                        <div>

                            <p>Columns Before</p>

                            <h2>{result.columns_before}</h2>

                        </div>

                        <div>

                            <p>Columns After</p>

                            <h2>{result.columns_after}</h2>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

}

export default Cleaning;