import { Database, Rows3, Columns3, AlertTriangle } from "lucide-react";

function DatasetOverview() {
  const dataset = {
    name: "No Dataset Uploaded",
    rows: "--",
    columns: "--",
    missing: "--",
  };

  return (
    <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-[#4d2a2d] p-2.5 text-[#f2d7a0]">
          <Database size={18} />
        </div>
        <h2 className="text-lg font-semibold text-[#f8ebd5]">Dataset Overview</h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-[#d7b98a]">Dataset</p>
          <p className="mt-1 font-semibold text-[#f8ebd5]">{dataset.name}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[16px] border border-[#a97d53]/15 bg-[#2f171b]/70 p-3">
            <Rows3 className="mb-2 text-[#d7b98a]" size={16} />
            <p className="font-semibold text-[#f8ebd5]">{dataset.rows}</p>
            <span className="text-sm text-[#d7b98a]">Rows</span>
          </div>
          <div className="rounded-[16px] border border-[#a97d53]/15 bg-[#2f171b]/70 p-3">
            <Columns3 className="mb-2 text-[#d7b98a]" size={16} />
            <p className="font-semibold text-[#f8ebd5]">{dataset.columns}</p>
            <span className="text-sm text-[#d7b98a]">Columns</span>
          </div>
          <div className="rounded-[16px] border border-[#a97d53]/15 bg-[#2f171b]/70 p-3">
            <AlertTriangle className="mb-2 text-[#d7b98a]" size={16} />
            <p className="font-semibold text-[#f8ebd5]">{dataset.missing}</p>
            <span className="text-sm text-[#d7b98a]">Missing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatasetOverview;