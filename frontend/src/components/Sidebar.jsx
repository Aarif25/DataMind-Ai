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
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    title: "Summary",
    icon: BarChart3,
    path: "/summary",
  },
  {
    title: "Cleaning",
    icon: Sparkles,
    path: "/clean",
  },
  {
    title: "Training",
    icon: BrainCircuit,
    path: "/train",
  },
  {
    title: "Model Export",
    icon: Package,
    path: "/export",
  },
  {
    title: "PCA",
    icon: LineChart,
    path: "/pca",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/report",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm fixed left-0 top-0">

      <div className="p-6">

        <h1 className="text-2xl font-bold text-blue-600">

          DataMind AI

        </h1>

        <p className="text-gray-500 text-sm">

          Machine Learning Platform

        </p>

      </div>

      <nav className="px-3">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink

              key={item.title}

              to={item.path}

              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >

              <Icon size={20} />

              <span>{item.title}</span>

            </NavLink>

          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;