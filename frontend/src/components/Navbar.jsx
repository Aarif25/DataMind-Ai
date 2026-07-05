import { Search, Bell, Sparkles, UserCircle2 } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#c7a965]/50 bg-[#3d2025]/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-[#c7a965]">
            <Sparkles size={16} />
            <span>Workspace</span>
          </div>
          <h2 className="mt-1 text-xl font-semibold text-[#f6e7c8]">Data workspace</h2>
        </div>

        <div className="flex items-center gap-3">
          <label className="hidden items-center gap-2 rounded-2xl border border-[#c7a965]/50 bg-[#f6e7c8]/90 px-3 py-2 text-sm text-[#5b342b] md:flex">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search data"
              className="w-40 bg-transparent outline-none placeholder-[#8c684a]"
            />
          </label>

          <button className="rounded-2xl border border-[#c7a965]/50 bg-[#f6e7c8]/90 p-2.5 text-[#5b342b] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f2dcaa] hover:text-[#3b1e1e]">
            <Bell size={18} />
          </button>

          <div className="flex items-center gap-2 rounded-2xl border border-[#c7a965]/50 bg-[#f6e7c8]/90 px-3 py-2">
            <UserCircle2 size={24} className="text-[#7a2438]" />
            <span className="hidden text-sm font-medium text-[#4b2a24] sm:block">Analyst</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;