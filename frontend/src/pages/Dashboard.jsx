import {
    Database,
    Brain,
    Trophy,
    FileText,
    Upload,
    PlayCircle,
    ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import { AppContext } from "../context/AppContext";
import StatCard from "../components/StatCard";

import QuickAction from "../components/QuickAction";
import DatasetOverview from "../components/DatasetOverview";
import Leaderboard from "../components/Leaderboard";
import RecentActivity from "../components/RecentActivity";



function Dashboard() {
  const { summary, training } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-amber-700/30 bg-gradient-to-br from-amber-950/40 via-amber-900 to-amber-950 p-7 text-white shadow-[0_20px_60px_-20px_rgba(139,35,60,0.3)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-600/10 px-4 py-2 text-sm text-amber-300">
              <Brain size={14} />
              <span>Workspace ready</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-amber-100">
              Welcome back
            </h1>
            <p className="mt-3 text-sm leading-7 text-amber-200/80 sm:text-base">
              Upload a dataset, review the structure, clean it, and train a model in one place.
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-600/40 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-600/50"
          >
            Start a project
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Datasets" value="0" icon={Database} />
        <StatCard title="Models" value="0" icon={Brain} color="text-green-600" />
        <StatCard
          title="Best Accuracy"
          value={training ? training.best_model.score : "--"}
          icon={Trophy}
          color="text-yellow-500"
        />
        <StatCard
          title="Reports"
          value={summary ? summary.rows : "--"}
          icon={FileText}
          color="text-purple-600"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[28px] border border-amber-700/40 bg-amber-900/30 p-6 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-400">Quick actions</p>
              <h2 className="mt-1 text-2xl font-semibold text-amber-100">Next steps</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <QuickAction
              icon={Upload}
              title="Upload Dataset"
              description="Bring in a CSV file and begin your analysis journey."
              onClick={() => navigate("/upload")}
            />
            <QuickAction
              icon={PlayCircle}
              title="Train Model"
              description="Train and compare classification or regression models."
              onClick={() => navigate("/train")}
            />
          </div>
        </section>

        <section className="rounded-[28px] border border-amber-700/40 bg-amber-900/30 p-6 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-400">Activity</p>
              <h2 className="mt-1 text-2xl font-semibold text-amber-100">Recent activity</h2>
            </div>
          </div>
          <div className="mt-6">
            <RecentActivity />
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <DatasetOverview />
        <Leaderboard />
        <RecentActivity />
      </div>
    </div>
  );
}

export default Dashboard;