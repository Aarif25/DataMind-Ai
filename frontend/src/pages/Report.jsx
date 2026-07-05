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

            <div className="bg-[#361c22]/80 rounded-[20px] border border-[#a97d53]/20 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] p-8 backdrop-blur">

                <div className="flex items-center gap-3 text-[#c7a965]">

                    <div className="rounded-2xl bg-[#4d2a2d] p-2.5 text-[#f2d7a0]">

                        <FileText size={20} />

                    </div>

                    <p className="text-sm font-semibold uppercase tracking-[0.2em]">ML Report</p>

                </div>

                <h1 className="mt-5 text-3xl font-semibold text-[#f8ebd5] sm:text-4xl">Generate Report</h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-[#d7b98a]">

                    Create a professional PDF report containing

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