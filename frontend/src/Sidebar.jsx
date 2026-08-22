import React from 'react';
import { Link } from 'react-router-dom';
import plusIcon from './assets/plus.svg';

const Sidebar = () => {
  return (
    
    <div className="w-80 h-full ml-1 mr-1  bg-[#121212] rounded-md hidden md:flex flex-col overflow-hidden text-white shrink-0">
      
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between px-5 py-4">
          <h4 className="text-white text-lg font-bold">Your Library</h4>
          <button className="flex items-center gap-1.5 bg-[#242424] text-white text-sm rounded-full font-medium px-4 py-1.5 hover:bg-[#2a2a2a] transition-all duration-100 ease-in-out cursor-pointer">
            <img src={plusIcon} alt="Add" className="w-4 h-4 invert" />
            Create
          </button>
        </div>

        <div className="px-2 mt-2 space-y-4">
          <div className="bg-[#242424] rounded-xl p-4 flex flex-col items-start space-y-5">
            <div>
              <h3 className="text-white text-base font-bold">Create your first playlist</h3>
              <h6 className="text-[#a7a7a7] text-sm font-medium mt-1">It's easy, we'll help you</h6>
            </div>
            <button className="bg-white text-black font-bold text-sm px-4 py-2 rounded-full hover:scale-105 transition-all duration-100 ease-in-out cursor-pointer">
              Create playlist
            </button>
          </div>

          
        </div>
      </div>

      
      <div className="px-6 pb-4 mt-auto bg-[#121212]">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-[#a7a7a7]">
          <Link to="" className="hover:text-white transition-colors duration-200">Legal</Link>
          <Link to="" className="hover:text-white transition-colors duration-200">Safety & Privacy Center</Link>
          <Link to="" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          <Link to="" className="hover:text-white transition-colors duration-200">Cookies</Link>
          <Link to="" className="hover:text-white transition-colors duration-200">About Ads</Link>
        </div>
        
        <button className="flex items-center justify-center border border-white/20 hover:border-white text-white hover:scale-105 hover:bg-white/5 text-sm font-bold px-4 py-1.5 rounded-full mt-6 transition-all duration-200 ease-in-out cursor-pointer">
          English
        </button>
      </div>
    </div>
  );
};

export default Sidebar;