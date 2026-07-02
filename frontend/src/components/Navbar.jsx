import { Search, Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8">

      <h2 className="text-2xl font-semibold">

        Dashboard

      </h2>

      <div className="flex items-center gap-6">

        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />

        </div>

        <Bell className="cursor-pointer" />

        <UserCircle size={34} />

      </div>

    </header>
  );
}

export default Navbar;