import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { artistdata } from './value';
import playIcon from './assets/play.svg';
import pauseIcon from './assets/pause.svg';
import miniPlusIcon from './assets/miniplus.svg';
import dotdotIcon from './assets/dotdot.svg';
import timeIcon from './assets/time.svg';
import { PlayerContext } from './Contex/PlayerContext';

const Content2 = () => {
  const { index } = useParams();
  const artist = artistdata[index];
  const { playWithid, playStatus, play, pause, track, songsData } = useContext(PlayerContext);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!artist) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-white gap-3 p-6">
        <p className="text-neutral-400 text-sm font-medium">Artist not found.</p>
      </div>
    );
  }

  // Find songs associated with this artist
  const artistSongs = songsData
    ? songsData.filter(
        (song) =>
          song.desc?.toLowerCase().includes(artist.name.toLowerCase()) ||
          song.name?.toLowerCase().includes(artist.name.toLowerCase())
      )
    : [];

  // Fallback to top available songs if no exact name match in database
  const displaySongs = artistSongs.length > 0 ? artistSongs : (songsData ? songsData.slice(0, 5) : []);
  const isPlayingArtist = displaySongs.some((item) => item._id === track?._id) && playStatus;

  const handlePlayArtist = () => {
    if (displaySongs.length === 0) return;
    if (isPlayingArtist) {
      pause();
    } else if (track && displaySongs.some((item) => item._id === track._id)) {
      play();
    } else {
      playWithid(displaySongs[0]);
    }
  };

  return (
    <div className='w-full min-h-full rounded-md pb-28 sm:pb-32 overflow-x-hidden'>
      {/* Hero Header Banner */}
      <div className='w-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px] rounded-t-md p-4 sm:p-6 md:p-8 flex flex-col justify-end bg-gradient-to-b from-[#0db182] to-[#121212] transition-all'>
        <div className='flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-6 md:gap-8'>
          {/* Artist Avatar */}
          <div className='w-40 h-40 min-[420px]:w-48 min-[420px]:h-48 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 shadow-2xl shadow-black/80 overflow-hidden hover:scale-[1.02] transition-transform duration-300 ease-out cursor-pointer rounded-full shrink-0 bg-[#282828] border-2 border-white/10'>
            <img
              src={artist.image}
              alt={artist.name}
              className='w-full h-full rounded-full object-cover'
            />
          </div>

          {/* Artist Metadata */}
          <div className='flex flex-col items-center sm:items-start text-center sm:text-left min-w-0 flex-1'>
            <div className='flex items-center gap-1.5'>
              <svg className='w-4 h-4 text-[#3d91f4]' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
              </svg>
              <span className='text-xs sm:text-sm font-bold uppercase tracking-wider text-white/80'>
                Verified Artist
              </span>
            </div>
            <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-md break-words leading-tight mt-1 sm:mt-2'>
              {artist.name}
            </h1>
            <p className='text-xs sm:text-sm md:text-base text-neutral-300 font-medium mt-1.5'>
              {artist.type || "Artist"} • 3,450,210 monthly listeners
            </p>
          </div>
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className='flex items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-4'>
        <button
          onClick={handlePlayArtist}
          title={isPlayingArtist ? "Pause" : "Play"}
          className='bg-[#1db954] w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full transition-all duration-200 ease-out shadow-[0_8px_20px_rgba(29,185,84,0.35)] hover:scale-105 hover:bg-[#1ed760] active:scale-95 cursor-pointer shrink-0'
        >
          <img
            src={isPlayingArtist ? pauseIcon : playIcon}
            className={`w-5 h-5 sm:w-6 sm:h-6 text-black ${!isPlayingArtist ? 'ml-0.5' : ''}`}
            alt={isPlayingArtist ? "Pause" : "Play"}
          />
        </button>

        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
            isFollowing
              ? 'border-white/30 text-white hover:border-white'
              : 'border-white/50 text-white hover:border-white hover:scale-105'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>

        <button
          title="More options"
          className='p-2 text-neutral-400 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer rounded-full hover:bg-white/5'
        >
          <img className='w-5 h-5 invert opacity-70 hover:opacity-100' src={dotdotIcon} alt="More options" />
        </button>
      </div>

      {/* Section Title */}
      <div className='px-4 sm:px-6 md:px-8 mb-3 mt-2'>
        <h2 className='text-lg sm:text-xl font-bold text-white'>Popular</h2>
      </div>

      {/* Track List Header */}
      <div className='px-4 sm:px-6 md:px-8 mb-2'>
        <div className='flex items-center justify-between text-neutral-400 text-xs sm:text-sm font-medium pb-2 border-b border-white/10'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <span className='w-4 text-center'>#</span>
            <span>Title</span>
          </div>
          <div className='flex items-center gap-1 pr-2 sm:pr-4'>
            <img className='w-4 h-4 invert opacity-60' src={timeIcon} alt="Duration" />
          </div>
        </div>
      </div>

      {/* Track List Items */}
      <div className='flex flex-col gap-1 px-2 sm:px-4 md:px-6'>
        {displaySongs.length > 0 ? (
          displaySongs.map((item, i) => {
            const isCurrentTrack = track?._id === item._id;
            return (
              <div
                key={item._id || i}
                onClick={() => playWithid(item)}
                className={`flex items-center justify-between gap-3 sm:gap-4 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg transition-colors duration-150 group cursor-pointer ${
                  isCurrentTrack ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className='flex items-center gap-3 sm:gap-4 min-w-0 flex-1'>
                  <span
                    className={`w-4 text-center text-xs sm:text-sm font-medium shrink-0 ${
                      isCurrentTrack ? 'text-[#1db954]' : 'text-neutral-400 group-hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-10 h-10 sm:w-11 sm:h-11 rounded object-cover shrink-0 bg-[#282828]'
                  />
                  <div className='flex flex-col min-w-0 flex-1 pr-2'>
                    <span
                      className={`text-xs sm:text-sm font-medium truncate ${
                        isCurrentTrack ? 'text-[#1db954]' : 'text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className='text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5'>
                      {item.desc || artist.name}
                    </span>
                  </div>
                </div>

                <span className='text-[11px] sm:text-xs text-neutral-400 tabular-nums shrink-0 pr-2'>
                  {item.duration || "3:00"}
                </span>
              </div>
            );
          })
        ) : (
          <div className='py-8 text-center text-neutral-400 text-sm'>
            No songs available for this artist yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Content2;