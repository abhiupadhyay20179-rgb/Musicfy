import React from 'react';
import { ListMusic, PlusCircle, Library, PlusSquare, ArrowLeft } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/play.png';

const AdminSidebar = () => {
  return (
    <div className="bg-black min-h-screen w-20 md:w-64 text-gray-400 p-4 flex flex-col gap-8 transition-all duration-300 border-r border-[#282828]">
      
      {/* Brand Header */}
      <Link to="/admin" className="flex items-center gap-3 cursor-pointer mt-2 px-2 group">
        <img 
          src={logo} 
          alt="Musicfy logo" 
          className="w-8 h-8 rounded-full object-cover group-hover:scale-110 transition-transform duration-300 invert" 
        />
        <span className="text-white font-bold text-xl hidden md:block tracking-tight opacity-0 md:opacity-100 transition-opacity duration-300">
          Musicfy <span className="text-xs text-[#1db954] font-semibold uppercase ml-1">Admin</span>
        </span>
      </Link>

      <div className="flex flex-col gap-6 mt-4">
        {/* Manage Songs */}
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 hidden md:block mb-1 px-2">
            Manage Songs
          </p>

          <NavLink 
            to="/admin/add-song" 
            className={({ isActive }) => 
              `flex items-center gap-4 px-2 py-3 rounded-md cursor-pointer group transition-all duration-300 ${
                isActive ? 'bg-[#282828] text-white' : 'hover:bg-gray-800 text-gray-400'
              }`
            }
          >
            <div className="group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <PlusCircle size={24} />
            </div>
            <span className="text-sm font-medium hidden md:block group-hover:text-white transition-colors duration-300">
              Add Song
            </span>
          </NavLink>

          <NavLink 
            to="/admin/list-song" 
            className={({ isActive }) => 
              `flex items-center gap-4 px-2 py-3 rounded-md cursor-pointer group transition-all duration-300 ${
                isActive ? 'bg-[#282828] text-white' : 'hover:bg-gray-800 text-gray-400'
              }`
            }
          >
            <div className="group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <ListMusic size={24} />
            </div>
            <span className="text-sm font-medium hidden md:block group-hover:text-white transition-colors duration-300">
              Song List
            </span>
          </NavLink>
        </div>

        {/* Manage Albums */}
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 hidden md:block mb-1 px-2">
            Manage Albums
          </p>

          <NavLink 
            to="/admin/add-album" 
            className={({ isActive }) => 
              `flex items-center gap-4 px-2 py-3 rounded-md cursor-pointer group transition-all duration-300 ${
                isActive ? 'bg-[#282828] text-white' : 'hover:bg-gray-800 text-gray-400'
              }`
            }
          >
            <div className="group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <PlusSquare size={24} />
            </div>
            <span className="text-sm font-medium hidden md:block group-hover:text-white transition-colors duration-300">
              Add Album
            </span>
          </NavLink>

          <NavLink 
            to="/admin/list-album" 
            className={({ isActive }) => 
              `flex items-center gap-4 px-2 py-3 rounded-md cursor-pointer group transition-all duration-300 ${
                isActive ? 'bg-[#282828] text-white' : 'hover:bg-gray-800 text-gray-400'
              }`
            }
          >
            <div className="group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <Library size={24} />
            </div>
            <span className="text-sm font-medium hidden md:block group-hover:text-white transition-colors duration-300">
              Album List
            </span>
          </NavLink>
        </div>

        {/* Quick Link back to Main App */}
        <div className="pt-4 mt-auto border-t border-[#282828]">
          <Link 
            to="/" 
            className="flex items-center gap-4 px-2 py-3 rounded-md cursor-pointer group hover:bg-gray-800 transition-all duration-300 text-gray-400"
          >
            <div className="group-hover:text-white group-hover:-translate-x-1 transition-all duration-300">
              <ArrowLeft size={24} />
            </div>
            <span className="text-sm font-medium hidden md:block group-hover:text-white transition-colors duration-300">
              Back to Player
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminSidebar;
