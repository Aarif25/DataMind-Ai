import { Clock3 } from "lucide-react";

function RecentActivity() {
  const activity = [
    "Uploaded Dataset",
    "Cleaned Dataset",
    "Trained Random Forest",
    "Generated Report",
  ];

  return (
    <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-[#4d2a2d] p-2.5 text-[#f2d7a0]">
          <Clock3 size={18} />
        </div>
        <h2 className="text-lg font-semibold text-[#f8ebd5]">Recent Activity</h2>
      </div>

      <div className="space-y-3">
        {activity.map((item, index) => (
          <div key={index} className="flex items-center gap-3 rounded-[16px] border border-[#a97d53]/20 bg-[#2f171b]/70 px-3 py-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#c7a965]" />
            <p className="text-sm font-medium text-[#e8dcc8]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;