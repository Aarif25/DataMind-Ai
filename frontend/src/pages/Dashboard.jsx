import {

    Database,

    Brain,

    Trophy,

    FileText,

    Upload,

    PlayCircle

} from "lucide-react";

import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import { AppContext } from "../context/AppContext";
import StatCard from "../components/StatCard";

import QuickAction from "../components/QuickAction";
import DatasetOverview from "../components/DatasetOverview";
import Leaderboard from "../components/Leaderboard";
import RecentActivity from "../components/RecentActivity";



function Dashboard(){
  const {

    summary,

    training

  } = useContext(AppContext);

    const navigate = useNavigate();

    return(

        <div>

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Welcome to DataMind AI 👋

                </h1>

                <p className="text-gray-500 mt-2">

                    Build, Train and Analyze Machine Learning models effortlessly.

                </p>

            </div>

            <div className="grid grid-cols-4 gap-6">

                <StatCard

                    title="Datasets"

                    value="0"

                    icon={Database}

                />

                <StatCard

                    title="Models"

                    value="0"

                    icon={Brain}

                    color="text-green-600"

                />

                <StatCard

                    title="Best Accuracy"

                    value={training ? training.best_model.score : "--"}

                    icon={Trophy}

                    color="text-yellow-500"

                />

                <StatCard

                    title="Reports"

                    value={summary?summary.rows:"--"}

                    icon={FileText}

                    color="text-purple-600"

                />

            </div>

            <div className="mt-10">

                <h2 className="text-2xl font-semibold mb-6">

                    Quick Actions

                </h2>

                <div className="grid grid-cols-2 gap-6">

                    <QuickAction

                        icon={Upload}

                        title="Upload Dataset"

                        description="Upload a CSV dataset."

                        onClick={()=>navigate("/upload")}

                    />

                    <QuickAction 

                        icon={PlayCircle}

                        title="Train Model"

                        description="Train Classification and Regression models."

                        onClick={()=>navigate("/train")}

                    />

                </div>
                <div className="grid grid-cols-3 gap-6 mt-10">

    <DatasetOverview/>

    <Leaderboard/>

    <RecentActivity/>

</div>

            </div>

        </div>

    )

}


export default Dashboard;