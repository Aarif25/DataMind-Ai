import {
  LayoutDashboard,
  Upload,
  BarChart3,
  Sparkles,
  BrainCircuit,
  LineChart,
  FileText,
  Settings,
  Package,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Upload", icon: Upload, path: "/upload" },
  { title: "Summary", icon: BarChart3, path: "/summary" },
  { title: "Cleaning", icon: Sparkles, path: "/clean" },
  { title: "Training", icon: BrainCircuit, path: "/train" },
  { title: "Model Export", icon: Package, path: "/export" },
  { title: "PCA", icon: LineChart, path: "/pca" },
  { title: "Reports", icon: FileText, path: "/report" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-[#c7a965]/50 bg-[#2f171b] px-4 py-5 text-[#f6e7c8] shadow-2xl shadow-[#1c0f12]/30">
      <div className="rounded-3xl border border-[#c7a965]/50 bg-[#f6e7c8]/90 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-[#7a2438] to-[#a24a4a] p-2.5 shadow-lg shadow-[#7a2438]/30">
            <BrainCircuit size={22} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#4b2a24]">DataMind</h1>
            <p className="text-sm text-[#6e4b3b]">Data workflow studio</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 space-y-1.5">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-600/20"
                    : "text-[#e8dcc8] hover:bg-[#4d2a2d] hover:text-[#f8ebd5]"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-[#a97d53]/20 bg-[#3c2228]/70 p-4 text-sm text-[#d7b98a]">
        <p className="font-semibold text-[#f8ebd5]">Ready for your next step</p>
        <p className="mt-1 text-[#c7a965]">Import a dataset and start building your workflow.</p>
      </div>
    </aside>
  );
}

export default Sidebar;