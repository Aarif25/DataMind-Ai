import { useState } from "react";

import { FileText } from "lucide-react";

import {

    generateReport

} from "../services/api";

function Report(){

    const[loading,setLoading]=useState(false);

    const[result,setResult]=useState(null);

    async function handleGenerate(){

        try{

            setLoading(true);

            const response=await generateReport();

            setResult(response);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    }

    function handleDownload(){

        window.open(

            "http://127.0.0.1:8000/download/report",

            "_blank"

        );

    }

    return(

        <div className="space-y-8">

            <h1 className="text-4xl font-bold">

                Reports

            </h1>

            <div className="bg-white rounded-xl border shadow-sm p-8">

                <FileText

                    size={60}

                    className="text-blue-600"

                />

                <h2 className="text-2xl font-semibold mt-6">

                    Machine Learning Report

                </h2>

                <p className="text-gray-500 mt-2">

                    Generate a professional PDF report containing

                    dataset summary,

                    training results,

                    evaluation,

                    recommendation,

                    feature importance,

                    and PCA analysis.

                </p>

                <div className="flex gap-5 mt-8">

                    <button

                        onClick={handleGenerate}

                        className="bg-blue-600 text-white px-8 py-3 rounded-xl"

                    >

                        {

                            loading

                            ?"Generating..."

                            :"Generate Report"

                        }

                    </button>

                    {

                        result &&

                        <button

                            onClick={handleDownload}

                            className="bg-green-600 text-white px-8 py-3 rounded-xl"

                        >

                            Download PDF

                        </button>

                    }

                </div>

            </div>

        </div>

    )

}

export default Report;