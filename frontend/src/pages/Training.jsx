import { useContext, useState } from "react";

import { AppContext } from "../context/AppContext";

import { trainModel } from "../services/api";

import ModelCard from "../components/ModelCard";

import LeaderboardTable from "../components/LeaderboardTable";
import FeatureImportanceChart from "../components/FeatureImportanceChart";

import RecommendationCard from "../components/RecommendationCard";
import ProgressBar from "../components/ProgressBar";

function Training(){

    const{

        dataset,

        summary,

        setTraining

    }=useContext(AppContext);

    const[target,setTarget]=useState("");

    const[loading,setLoading]=useState(false);

    const[progress,setProgress]=useState(0);

    const[result,setResult]=useState(null);

    async function handleTraining(){

        if(!target){

            alert("Select Target Column");

            return;

        }

        setLoading(true);

        setProgress(10);

        const timer=setInterval(()=>{

            setProgress(prev=>{

                if(prev>=90) return prev;

                return prev+5;

            });

        },150);

        try{

            const response=await trainModel(

                dataset.filename,

                target

            );

            clearInterval(timer);

            setProgress(100);

            setResult(response);

            setTraining(response);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <div className="space-y-8">

            <h1 className="text-4xl font-bold">

                Model Training

            </h1>

            <div className="bg-white rounded-xl border shadow-sm p-6">

                <label className="font-semibold">

                    Target Column

                </label>

                <select

                    className="border rounded-lg w-full mt-3 p-3"

                    value={target}

                    onChange={(e)=>setTarget(e.target.value)}

                >

                    <option value="">

                        Select Target

                    </option>

                    {

                        summary?.columns_list?.map(col=>(

                            <option
                                key={col}
                                value={col}
                            >

                                {col}

                            </option>

                        ))

                    }

                </select>

                <button

                    onClick={handleTraining}

                    className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-6"

                >

                    Train Models

                </button>

            </div>

            {

                loading &&

                <ProgressBar progress={progress}/>

            }

            {

                result &&

                <>

                    <LeaderboardTable

                        leaderboard={result.leaderboard}

                    />

                    <div className="grid grid-cols-2 gap-6">

                        <ModelCard

                            title="Best Model"

                            value={result.best_model.name}

                            subtitle={`Score : ${result.best_model.score}`}

                        />

                        <ModelCard

                            title="Problem Type"

                            value={result.problem_type}

                        />

                    </div>
                    <div className="grid grid-cols-2 gap-6">

    <ModelCard

        title="Cross Validation"

        value={

            result.cross_validation.mean_score

        }

        subtitle={`Std : ${result.cross_validation.std}`}

    />

    <ModelCard

        title="Hyperparameter Score"

        value={

            result.hyperparameter_tuning.best_score

        }

    />

</div>

<div className="mt-8">

    <RecommendationCard

        recommendation={

            result.recommendation

        }

    />

</div>

<div className="mt-8">

    <FeatureImportanceChart

        data={

            result.feature_importance

        }

    />

</div>

                </>

            }

        </div>

    )

}

export default Training;