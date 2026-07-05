import { Trophy } from "lucide-react";

function Leaderboard() {
  const models = [
    { name: "Random Forest", score: "--" },
    { name: "XGBoost", score: "--" },
    { name: "Decision Tree", score: "--" },
  ];

  return (
    <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-[#4d2a2d] p-2.5 text-[#f2d7a0]">
          <Trophy size={18} />
        </div>
        <h2 className="text-lg font-semibold text-[#f8ebd5]">Leaderboard</h2>
      </div>

      <div className="space-y-3">
        {models.map((model, index) => (
          <div key={index} className="flex items-center justify-between rounded-[16px] border border-[#a97d53]/20 bg-[#2f171b]/70 px-4 py-3">
            <div>
              <p className="font-medium text-[#f8ebd5]">{model.name}</p>
              <p className="text-sm text-[#d7b98a]">Model #{index + 1}</p>
            </div>
            <span className="rounded-full bg-[#4d2a2d] px-3 py-1 text-sm font-semibold text-[#f2d7a0] shadow-sm">
              {model.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;