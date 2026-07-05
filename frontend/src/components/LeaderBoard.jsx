import { Trophy } from "lucide-react";

function Leaderboard() {
  const models = [
    { name: "Random Forest", score: "--" },
    { name: "XGBoost", score: "--" },
    { name: "Decision Tree", score: "--" },
  ];

  return (
    <div className="rounded-[24px] border border-amber-700/40 bg-amber-900/30 p-6 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-2.5 text-white shadow-lg shadow-amber-500/20">
          <Trophy size={18} />
        </div>
        <h2 className="text-xl font-semibold text-amber-100">Leaderboard</h2>
      </div>

      <div className="space-y-3">
        {models.map((model, index) => (
          <div key={index} className="flex items-center justify-between rounded-2xl border border-amber-700/40 bg-amber-800/30 px-4 py-3">
            <div>
              <p className="font-medium text-amber-100">{model.name}</p>
              <p className="text-sm text-amber-300">Model #{index + 1}</p>
            </div>
            <span className="rounded-full bg-amber-600/30 px-3 py-1 text-sm font-semibold text-amber-300 shadow-sm">
              {model.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;