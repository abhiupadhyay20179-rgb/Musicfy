import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import logo from './assets/play.png';
import homeIcon from './assets/home.svg';
import searchIcon from './assets/seach.svg';
import { PlayerContext } from './Contex/PlayerContext';

const Navbar = () => {
  const { token, setToken, songsData, playWithid, userData, audioRef, setPlayStatus } = useContext(PlayerContext);

  const [searchQuery, setsearchQuery] = useState("");

  const logout = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayStatus(false);
    setToken("");
    localStorage.removeItem("token");
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredSongs = trimmedQuery === "" 
    ? [] 
    : (songsData || []).filter((song) =>
        song.name.toLowerCase().includes(trimmedQuery) ||
        (song.desc && song.desc.toLowerCase().includes(trimmedQuery))
      );

  const handleSelectedSong = (songid) => {
    if (playWithid) {
      playWithid(songid);
    }
    setsearchQuery("");
  };

  return (
    <div className="w-full h-16 bg-black/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center shrink-0 px-3 sm:px-6 gap-2 sm:gap-4 border-b border-neutral-900/60">
      <Link to="/home" className="flex items-center gap-2 shrink-0 cursor-pointer">
        <img className="w-8 h-8 rounded-full object-cover invert" src={logo} alt="Musicfy logo" />
        <span className="text-white text-xl sm:text-2xl font-extrabold tracking-tight hidden min-[400px]:inline">
          Musicfy
        </span>
      </Link>

      <div className="flex items-center gap-2 flex-1 max-w-[220px] min-[480px]:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <Link 
          to="/home" 
          className="hidden sm:flex items-center justify-center bg-[#292929] hover:bg-[#383838] h-10 w-10 sm:h-11 sm:w-11 rounded-full transition-transform hover:scale-105 shrink-0"
          title="Home"
        >
          <img src={homeIcon} className="invert cursor-pointer w-5 h-5" alt="home" />
        </Link>

        <div className="bg-[#292929] relative w-full h-9 sm:h-11 rounded-full border border-neutral-700/70 px-3 text-white flex items-center focus-within:ring-2 focus-within:ring-white transition-colors duration-200">
          <img className="h-4 w-4 sm:h-5 sm:w-5 invert opacity-70 shrink-0" src={searchIcon} alt="search" />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setsearchQuery(e.target.value)} 
            placeholder="Search songs..." 
            className="bg-transparent flex-1 w-full h-full px-2 sm:px-3 text-xs sm:text-sm text-white placeholder-neutral-400 outline-none" 
          />
           
          {searchQuery.trim().length > 0 && (
            <div className="absolute top-11 sm:top-13 left-0 w-full min-w-[240px] sm:min-w-[320px] bg-[#181818] border border-neutral-700 rounded-xl max-h-72 sm:max-h-80 overflow-y-auto shadow-2xl z-50 p-2 flex flex-col gap-1">
              <div className="px-3 py-1 text-[11px] sm:text-xs text-neutral-400 font-semibold border-b border-neutral-800">
                Results for: <span className="text-white">"{searchQuery}"</span>
              </div>
             
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <div
                    key={song._id}
                    onClick={() => handleSelectedSong(song._id)}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-800 cursor-pointer transition-all duration-150"
                  >
                    <img 
                      src={song.image} 
                      alt={song.name} 
                      className="w-9 h-9 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col overflow-hidden text-left">
                      <p className="text-white text-xs sm:text-sm font-semibold truncate">{song.name}</p>
                      <p className="text-neutral-400 text-[11px] sm:text-xs truncate">{song.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-neutral-400 text-xs sm:text-sm">
                  No songs found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 text-neutral-500 font-bold shrink-0">
        {userData?.role === "admin" && (
          <>
            <Link
              to="/admin"
              className="transition-all duration-200 ease-in-out bg-white text-black px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#1ed760] hover:scale-105 active:scale-95 shadow-md flex items-center gap-1 cursor-pointer"
            >
              Admin
            </Link>
            <div className="hidden sm:block font-light text-xl text-white/30">|</div>
          </>
        )}

        {token && userData ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm shrink-0 select-none cursor-pointer" 
              title={userData.name}
            >
              {userData.name ? userData.name[0].toUpperCase() : "U"}
            </div>
            <span className="text-white text-xs sm:text-sm font-semibold max-w-[100px] truncate hidden md:inline-block">
              {userData.name}
            </span>
            <button
              onClick={logout}
              className="transition-all duration-200 ease-in-out bg-[#292929] text-white px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-700 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              to='/signup' 
              className="transition-all duration-200 ease-in-out text-neutral-300 hover:text-white text-xs sm:text-sm hover:scale-105"
            >
              Signup
            </Link>

            <Link to="/login">
              <button
                className="transition-all duration-200 ease-in-out bg-white text-[#292929] px-3.5 py-1 sm:px-5 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer hover:scale-105"
              >
                Log in
              </button>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;