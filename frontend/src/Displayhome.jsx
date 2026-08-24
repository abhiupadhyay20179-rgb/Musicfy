import React, { useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { artistdata } from './value';

import playIcon from './assets/play.svg';
import { PlayerContext } from './Contex/PlayerContext';

const Displayhome = () => {

  const artists = artistdata;

  const navigate = useNavigate()
  const { songsData, albumsData } = useContext(PlayerContext)

  const shuffledSongs = useMemo(() => {
    if (!songsData || songsData.length === 0) return [];
    const arr = songsData.map((song, originalIndex) => ({ ...song, originalIndex }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [songsData]);

  return (
    <div className="flex-1 h-full bg-[#121212] sm:my-2 sm:ml-1 sm:mr-2 rounded-none sm:rounded-xl pb-24 sm:pb-10 overflow-y-auto">
      <h1 className="text-white text-xl sm:text-2xl hover:underline px-4 sm:px-8 mt-5 sm:mt-6 font-bold cursor-pointer inline-block">
        Trending songs
      </h1>
      <div className="flex gap-3 sm:gap-4 px-4 sm:px-8 my-2 sm:my-3 overflow-x-auto">
        {shuffledSongs.map((song) => (
          <div 
            onClick={() => navigate(`/content/${song.originalIndex}`)} 
            key={`section2-${song._id}`} 
            className="group p-2 sm:p-3 flex flex-col text-white w-36 sm:w-48 shrink-0 space-y-2 sm:space-y-3 hover:bg-[#282828] bg-[#181818]/50 sm:bg-transparent rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-black/50"
          >
            <div className="relative w-full aspect-square rounded-md overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              <img 
                src={song.image} 
                alt={song.title || song.name} 
                className="w-full h-full object-cover" 
              />
              <div className="hidden sm:flex absolute right-2 bottom-2 bg-[#1db954] w-12 h-12 text-black rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-xl hover:scale-105 hover:bg-[#1ed760] items-center justify-center">
                <img src={playIcon} alt="Play Icon" className="w-6 h-6" />
              </div>
            </div>
            <div className="flex flex-col space-y-0.5 sm:space-y-1">
              <span className="hover:text-white hover:underline text-sm sm:text-base font-semibold cursor-pointer truncate">
                {song.name}
              </span>
              <span className="hover:underline text-xs sm:text-[14px] cursor-pointer text-[#a7a7a7] truncate">
                {song.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* <h1 className="text-white text-xl sm:text-2xl hover:underline px-4 sm:px-8 mt-6 sm:mt-8 font-bold cursor-pointer inline-block">
        Popular artists
      </h1>
      <div className="flex gap-3 sm:gap-5 px-4 sm:px-8 my-3 sm:my-5 overflow-x-auto">
        {artists.map((artist, index) => (
          <Link to={`/content2/${index}`} key={`section2-${artist.id}`}>
            <div className="group flex flex-col text-white w-32 sm:w-44 shrink-0 space-y-2 sm:space-y-3 hover:bg-[#282828] bg-[#181818]/50 sm:bg-transparent rounded-xl p-2 sm:p-2.5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-black/50">
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
                <div className="hidden sm:flex absolute right-2 bottom-2 bg-[#1db954] w-11 h-11 text-black rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-xl hover:scale-105 hover:bg-[#1ed760] items-center justify-center">
                  <img src={playIcon} alt="Play Icon" className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col space-y-0.5 sm:space-y-1 text-center sm:text-left">
                <span className="hover:text-white hover:underline text-sm sm:text-base font-semibold cursor-pointer truncate">
                  {artist.name}
                </span>
                <span className="hover:underline text-xs sm:text-[14px] cursor-pointer text-[#a7a7a7] truncate">
                  {artist.type}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div> */}

      <h1 className="text-white text-xl sm:text-2xl hover:underline px-4 sm:px-8 mt-6 sm:mt-8 font-bold cursor-pointer inline-block">
        Popular Albums and singles
      </h1>
      <div className="flex gap-3 sm:gap-5 px-4 sm:px-8 my-3 sm:my-5 overflow-x-auto">
        {albumsData.map((album, index) => (
          <Link to={`/Albumcontent/${index}`} key={album._id || album.id || index}>
            <div className="group flex flex-col text-white w-36 sm:w-44 shrink-0 space-y-2 sm:space-y-3 hover:bg-[#282828] bg-[#181818]/50 sm:bg-transparent rounded-xl p-2 sm:p-2.5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-black/50">
              <div className="relative w-full aspect-square rounded-md overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                <img 
                  src={album.image} 
                  alt={album.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="hidden sm:flex absolute right-2 bottom-2 bg-[#1db954] w-11 h-11 text-black rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-xl hover:scale-105 hover:bg-[#1ed760] items-center justify-center">
                  <img src={playIcon} alt="Play Icon" className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col space-y-0.5 sm:space-y-1">
                <span className="hover:text-white hover:underline text-sm sm:text-base font-semibold cursor-pointer truncate">
                  {album.name}
                </span>
                <span className="hover:underline text-xs sm:text-[14px] cursor-pointer text-[#a7a7a7] truncate">
                  {album.desc}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Displayhome