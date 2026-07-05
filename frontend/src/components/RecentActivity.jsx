import { Clock3 } from "lucide-react";

function RecentActivity() {
  const activity = [
    "Uploaded Dataset",
    "Cleaned Dataset",
    "Trained Random Forest",
    "Generated Report",
  ];

  return (
    <div className="rounded-[24px] border border-amber-700/40 bg-amber-900/30 p-6 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-amber-400 p-2.5 text-white shadow-lg shadow-amber-600/20">
          <Clock3 size={18} />
        </div>
        <h2 className="text-xl font-semibold text-amber-100">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activity.map((item, index) => (
          <div key={index} className="flex items-center gap-3 rounded-2xl border border-amber-700/40 bg-amber-800/30 px-3 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-600" />
            <p className="text-sm font-medium text-amber-200">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;