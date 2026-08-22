import React, { useContext } from 'react';
import miniPlusIcon from './assets/miniplus.svg';
import backIcon from './assets/backplayer.svg';
import playIcon from './assets/play.svg';
import pauseIcon from './assets/pause.svg';
import nextIcon from './assets/nextplayer.svg';
import unmuteIcon from './assets/unmute.svg';
import muteIcon from './assets/mute.svg';
import shuffleIcon from './assets/shuffle.svg';
import repeatIcon from './assets/reapet.svg';
import queueIcon from './assets/queue.svg';
import { PlayerContext } from './Contex/PlayerContext';

const Player = () => {
  const {
    track, seekbar, seekbg, playStatus, play, pause, time,
    previous, next, seekSong, volumebg, volumebar, changeVolume,
    isMuted, toggleMute
  } = useContext(PlayerContext);

  return (
   <div className='fixed bottom-0 left-0 right-0 w-full h-16 sm:h-20 bg-[#121212] border-t border-[#282828] px-3 sm:px-4 flex items-center justify-between shrink-0 select-none z-[9999] pb-[env(safe-area-inset-bottom)]'>
      <div className='flex items-center gap-2.5 sm:gap-3.5 flex-1 min-w-0 md:w-[30%] md:flex-initial'>
        {track ? (
          <>
            <img
              src={track.image}
              className='w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-md shadow-md shrink-0'
              alt={track.name || "Now playing"}
            />
            <div className='flex flex-col min-w-0 max-w-[130px] min-[400px]:max-w-[180px] sm:max-w-[200px]'>
              <h4 className='text-xs sm:text-sm font-semibold text-white truncate hover:underline cursor-pointer'>
                {track.name || 'Unknown Title'}
              </h4>
              <p className='text-[10px] sm:text-xs text-[#b3b3b3] truncate hover:underline cursor-pointer'>
                {track.desc || track.album || "Unknown"}
              </p>
            </div>
            <button className='text-[#b3b3b3] hover:text-white transition-transform hover:scale-110 cursor-pointer ml-0.5 sm:ml-1 shrink-0'>
              <img className='w-4 h-4 sm:w-4.5 sm:h-4.5 invert opacity-70 hover:opacity-100' src={miniPlusIcon} alt="Save to library" />
            </button>
          </>
        ) : (
          <div className="text-xs text-neutral-500">No song playing</div>
        )}
      </div>

      <div className='flex items-center justify-end md:justify-center py-2 sm:py-0 md:flex-col md:w-[45%] md:max-w-[720px] shrink-0 gap-2 sm:gap-4'>
        <div className='flex items-center gap-2.5 sm:gap-5'>
          <button className='cursor-pointer text-[#b3b3b3] hover:text-white transition-colors hidden sm:block'>
            <img className='w-4 h-4 invert opacity-70 hover:opacity-100' src={shuffleIcon} alt="Shuffle" />
          </button>

          <button onClick={previous} className='cursor-pointer text-[#b3b3b3] hover:text-white hover:scale-105 active:scale-95 transition-all p-1 sm:p-0'>
            <img className='w-4 h-4 sm:w-4.5 sm:h-4.5 invert' src={backIcon} alt='Previous' />
          </button>

          <button
            onClick={playStatus ? pause : play}
            className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md cursor-pointer shrink-0'
          >
            <img
              className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-black'
              src={playStatus ? pauseIcon : playIcon}
              alt={playStatus ? 'Pause' : 'Play'}
            />
          </button>

          <button onClick={next} className='cursor-pointer text-[#b3b3b3] hover:text-white hover:scale-105 active:scale-95 transition-all p-1 sm:p-0'>
            <img className='w-4 h-4 sm:w-4.5 sm:h-4.5 invert' src={nextIcon} alt='Next' />
          </button>

          <button className='cursor-pointer text-[#b3b3b3] hover:text-white transition-colors hidden sm:block'>
            <img className='w-4 h-4 invert opacity-70 hover:opacity-100' src={repeatIcon} alt="Repeat" />
          </button>
        </div>

        <div className='absolute top-0 left-0 w-full md:relative md:top-auto md:left-auto md:w-full flex items-center gap-2.5 md:mt-1.5'>
          <span className='hidden md:inline-block text-[11px] font-medium text-[#b3b3b3] tabular-nums min-w-[32px] text-right'>
            {time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}
          </span>

          <div
            ref={seekbg}
            onClick={seekSong}
            className='group w-full h-1 sm:h-1.5 md:h-3 flex items-center cursor-pointer bg-[#282828] md:bg-transparent'
          >
            <div className='w-full h-full md:h-1 bg-[#333333] md:bg-[#4d4d4d] md:group-hover:h-1.5 md:rounded-full relative transition-all duration-150'>
              <div
                ref={seekbar}
                className='bg-[#1db954] md:bg-white md:group-hover:bg-[#1db954] h-full md:rounded-full relative'
                style={{ width: '0%' }}
              >
                <div className='hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md transition-opacity pointer-events-none'></div>
              </div>
            </div>
          </div>

          <span className='hidden md:inline-block text-[11px] font-medium text-[#b3b3b3] tabular-nums min-w-[32px] text-left'>
            {time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className='hidden md:flex items-center justify-end gap-3 w-[30%]'>
        <button className='cursor-pointer text-[#b3b3b3] hover:text-white hidden lg:block'>
          <img className='w-4.5 h-4.5 invert opacity-70 hover:opacity-100' src={queueIcon} alt="Queue" />
        </button>

        <div className='flex items-center gap-2'>
          <button onClick={toggleMute} className='cursor-pointer hover:scale-105 transition-transform'>
            <img
              className='w-4.5 h-4.5 invert opacity-70 hover:opacity-100'
              src={isMuted ? muteIcon : unmuteIcon}
              alt='Volume'
            />
          </button>

          <div
            ref={volumebg}
            onClick={changeVolume}
            className='group w-20 lg:w-24 h-3 flex items-center cursor-pointer'
          >
            <div className='w-full h-1 bg-[#4d4d4d] group-hover:h-1.5 rounded-full relative transition-all duration-150 '>
              <div
                ref={volumebar}
                className='bg-white group-hover:bg-[#1db954] h-full rounded-full relative'
                style={{ width: '100%' }}
              >
                <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md transition-opacity pointer-events-none'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
