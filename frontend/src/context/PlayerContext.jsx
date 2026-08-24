import React, { useState, useEffect, createContext, useRef } from 'react';
import axios from 'axios';


export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

  const audioRef = useRef();
  const seekbg = useRef();
  const seekbar = useRef();
  const volumebg = useRef();
  const volumebar = useRef();

  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 }
  });


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
    else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const playWithid = (id) => {
    if (typeof id === 'object' && id !== null) {
      setTrack(id);
    } else {
      const song = songsData.find((item) => item._id === id);
      if (song) setTrack(song);
    }

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setPlayStatus(true);
        }).catch((err) => {
          console.error("Playback failed:", err);
          setPlayStatus(false);
        });
      }
    }, 50);
  };

  const playTrending = (song) => {
    playWithid(song);
  };

  const getSongData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success && response.data.songs && response.data.songs.length > 0) {
        setSongsData(response.data.songs);
        setTrack(response.data.songs[0]);
      }
    } catch (error) {
      console.error("Failed to fetch songs from backend:", error.message);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success && response.data.albums) {
        setAlbumsData(response.data.albums);
      }
    } catch (error) {
      console.error("Failed to fetch albums from backend:", error.message);
    }
  };

  const getUserData = async () => {
    try {
      if (!token) return;
      const response = await axios.get(`${url}/api/user/profile`, { headers: { token } });

      if (response.data.success) {
        setUserData(response.data.userData);
      }
      else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("failed to fetch user data:", error.message);

    }
  }

  useEffect(() => {
    if (token) {
      getUserData();

    }
    else {
      setUserData(null);
    }
  }, [token]);

  const previous = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track?._id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      }, 50);
    }
  };

  const next = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track?._id);
    if (currentIndex !== -1 && currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      }, 50);
      return true;
    }
    return false;
  };

  const seekSong = async (e) => {
    if (!seekbg.current || !audioRef.current || !audioRef.current.duration) return;
    const rect = seekbg.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    audioRef.current.currentTime = ((offsetX / rect.width) * audioRef.current.duration);
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      if (seekbar.current) {
        seekbar.current.style.width = ((audioRef.current.currentTime / audioRef.current.duration) * 100) + "%"
      }
      setTime({
        currentTime:
        {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60)
        },
        totalTime:
        {
          second: Math.floor((audioRef.current.duration || 0) % 60),
          minute: Math.floor((audioRef.current.duration || 0) / 60)
        }
      })
    }
  }


  useEffect(() => {
    if (token) {
      getSongData();
      getAlbumsData();
    }
  }, [token])


  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setPlayStatus(true);
  }

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  }

  const changeVolume = (e) => {
    if (!volumebg.current || !audioRef.current || !volumebar.current) return;
    const rect = volumebg.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const volumeValue = offsetX / rect.width;
    const clampedVolume = Math.max(0, Math.min(1, volumeValue));

    audioRef.current.volume = clampedVolume;

    if (audioRef.current.muted && clampedVolume > 0) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }

    volumebar.current.style.width = (clampedVolume * 100) + "%";
  };



  const contextValue = {
    token, setToken, userData, setUserData, getUserData, url, audioRef, seekbar, seekbg, track, setTrack, playStatus,
    setPlayStatus, time, setTime, play, pause, playWithid, playTrending, previous,
    next, seekSong, volumebg, volumebar, changeVolume, isMuted, toggleMute, songsData, albumsData,
    handleTimeUpdate
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;