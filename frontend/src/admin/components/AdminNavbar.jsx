import React from "react";
import { Bell, Search, Settings } from "lucide-react";

const AdminNavbar = () => {
  return (
    <div className="w-full h-16 bg-black border-b border-[#282828] flex justify-between items-center px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-white text-xl font-bold tracking-tight">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] group-hover:text-white w-4 h-4 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 pl-10 pr-4 py-2 bg-[#242424] border border-transparent focus:border-[#535353] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] rounded-full text-sm text-white placeholder-[#b3b3b3] outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#282828] text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#282828] text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#1db954] flex items-center justify-center text-black font-bold text-sm cursor-pointer">
            A
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
