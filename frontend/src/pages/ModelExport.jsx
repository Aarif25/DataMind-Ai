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

            <div className="bg-[#361c22]/80 rounded-[20px] border border-[#a97d53]/20 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] p-6 backdrop-blur">

                <h2 className="text-2xl font-semibold mb-5 text-[#f8ebd5]">

                    Files Included

                </h2>

                <ul className="space-y-3 text-[#e8dcc8]">

                    <li>✔ best_model.pkl</li>

                    <li>✔ preprocessor.pkl</li>

                    <li>✔ model_metadata.json</li>

                </ul>

            </div>

            <div className="bg-[#361c22]/80 rounded-[20px] border border-[#a97d53]/20 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] p-6 backdrop-blur">

                <h2 className="text-2xl font-semibold mb-5 text-[#f8ebd5]">

                    Leaderboard

                </h2>

                <table className="w-full border border-[#a97d53]/20">

                    <thead>

                        <tr className="bg-[#4d2a2d]">

                            <th className="text-[#d7b98a] border p-3">

                                Model

                            </th>

                            <th className="text-[#d7b98a] border p-3">

                                Score

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            modelInfo.leaderboard.map((model) => (

                                <tr key={model.model} className="border-b border-[#a97d53]/20">

                                    <td className="border p-3 text-[#e8dcc8]">

                                        {model.model}

                                    </td>

                                    <td className="border p-3 text-[#c7a965]">

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

        <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">

            <Icon
                size={24}
                className="text-[#c7a965]"
            />

            <p className="text-sm font-medium text-[#d7b98a] mt-4">

                {title}

            </p>

            <h2 className="text-2xl font-bold mt-2 text-[#f8ebd5]">

                {value}

            </h2>

        </div>

    );

}

export default ModelExport;