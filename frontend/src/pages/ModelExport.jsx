import { useEffect, useState } from "react";
import { Download, Package, Trophy, Target, Brain } from "lucide-react";

import {
    downloadModel,
    getModelInfo
} from "../services/api";

function ModelExport() {

    const [modelInfo, setModelInfo] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadModelInfo();

    }, []);

    async function loadModelInfo() {

        try {

            const response = await getModelInfo();

            if (response.status === "error") {

                setError(response.message);

            } else {

                setModelInfo(response);

            }

        } catch (err) {

            console.error(err);

            setError("Unable to load model information.");

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="text-center mt-20">

                <h2 className="text-2xl font-semibold">

                    Loading...

                </h2>

            </div>

        );

    }

    if (error) {

        return (

            <div className="text-center mt-20">

                <h2 className="text-2xl font-semibold text-red-600">

                    {error}

                </h2>

            </div>

        );

    }

    return (

        <div className="max-w-5xl mx-auto space-y-8">

            <h1 className="text-4xl font-bold">

                Model Export

            </h1>

            <div className="grid grid-cols-2 gap-6">

                <InfoCard
                    icon={Trophy}
                    title="Best Model"
                    value={modelInfo.best_model.name}
                />

                <InfoCard
                    icon={Brain}
                    title="Problem Type"
                    value={modelInfo.problem_type}
                />

                <InfoCard
                    icon={Target}
                    title="Target Column"
                    value={modelInfo.target}
                />

                <InfoCard
                    icon={Package}
                    title="Best Score"
                    value={modelInfo.best_model.score}
                />

            </div>

            <div className="bg-white rounded-xl shadow border p-6">

                <h2 className="text-2xl font-semibold mb-5">

                    Files Included

                </h2>

                <ul className="space-y-3">

                    <li>✔ best_model.pkl</li>

                    <li>✔ preprocessor.pkl</li>

                    <li>✔ model_metadata.json</li>

                </ul>

            </div>

            <div className="bg-white rounded-xl shadow border p-6">

                <h2 className="text-2xl font-semibold mb-5">

                    Leaderboard

                </h2>

                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="border p-3">

                                Model

                            </th>

                            <th className="border p-3">

                                Score

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            modelInfo.leaderboard.map((model) => (

                                <tr key={model.model}>

                                    <td className="border p-3">

                                        {model.model}

                                    </td>

                                    <td className="border p-3">

                                        {

                                            model.accuracy ??

                                            model.r2_score

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            <div className="flex justify-center">

                <button

                    onClick={downloadModel}

                    className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg"

                >

                    <Download size={22} />

                    Download Model

                </button>

            </div>

        </div>

    );

}

function InfoCard({

    icon: Icon,

    title,

    value

}) {

    return (

        <div className="bg-white rounded-xl border shadow-sm p-6">

            <Icon
                size={30}
                className="text-blue-600"
            />

            <p className="text-gray-500 mt-4">

                {title}

            </p>

            <h2 className="text-2xl font-bold mt-2">

                {value}

            </h2>

        </div>

    );

}

export default ModelExport;