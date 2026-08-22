import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Player from './Player';
import Display from './Display';
import Login from './Login';
import Signup from './signup';
import AdminLayout from './admin/AdminLayout';
import AddSong from './admin/pages/AddSong';
import ListSong from './admin/pages/ListSong';
import AddAlbum from './admin/pages/AddAlbum';
import ListAlbum from './admin/pages/ListAlbum';
import { PlayerContext } from './Contex/PlayerContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const { audioRef, track, next, setPlayStatus, token, userData, handleTimeUpdate } = useContext(PlayerContext);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleSongEnd = async () => {
    const hasNext = await next();
    if (!hasNext) {
      setPlayStatus(false);
    }
  };

  return (
    <div className="h-screen h-[100dvh] w-full bg-black flex flex-col overflow-hidden">
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            !token ? (
              <Navigate to="/login" replace />
            ) : !userData ? (
              <div className="flex items-center justify-center min-h-screen bg-[#121212]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-[#1db954] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-3 h-3 bg-[#1db954] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-3 h-3 bg-[#1db954] rounded-full animate-bounce"></div>
                </div>
              </div>
            ) : userData.role !== "admin" ? (
              <Navigate to="/" replace />
            ) : (
              <AdminLayout />
            )
          }
        >
          <Route index element={<AddSong />} />
          <Route path="add-song" element={<AddSong />} />
          <Route path="list-song" element={<ListSong />} />
          <Route path="add-album" element={<AddAlbum />} />
          <Route path="list-album" element={<ListAlbum />} />
        </Route>

        <Route
          path="/*"
          element={
            !token ? (
              <Navigate to="/login" replace />
            ) : (
              <>
                <Navbar />
                <div className="flex grow gap-0.5 min-h-0 pb-16 sm:pb-20">
                  <Sidebar />
                  <Display />
                </div>
              </>
            )
          }
        />
      </Routes>

      {token && !isAuthPage && (
        <>
          <Player />
          <audio ref={audioRef} onEnded={handleSongEnd} onTimeUpdate={handleTimeUpdate} src={track && track.file} id="audio-player" controls preload="auto" className='hidden'></audio>
        </>
      )}
    </div>
  );
};

export default App;