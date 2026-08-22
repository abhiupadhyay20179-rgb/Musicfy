import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../config";
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong"+error);
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong"+error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="p-6">
      <p className="text-2xl font-bold text-white mb-6 tracking-wide">All Song List</p>
      
      <div className="bg-[#181818] border border-[#282828] rounded-xl p-6 w-full shadow-lg">
        <div className="grid grid-cols-[0.5fr_1.5fr_2fr_1fr_0.5fr] items-center gap-4 text-[#b3b3b3] border-b border-[#282828] pb-3 mb-4 text-xs font-semibold uppercase tracking-wider">
          <span>Image</span>
          <span>Name</span>
          <span>Album</span>
          <span>Duration</span>
          <span className="text-right">Action</span>
        </div>
        
        <div className="flex flex-col">
          {data.length === 0 ? (
            <p className="text-[#b3b3b3] text-center py-6 text-sm">No songs found.</p>
          ) : (
            data.map((item, index) => (
              <div key={index} className="grid grid-cols-[0.5fr_1.5fr_2fr_1fr_0.5fr] items-center gap-4 hover:bg-[#2a2a2a] p-3 rounded-md transition-colors cursor-default group">
                <img src={item.image} alt="Song Art" className="w-12 h-12 object-cover rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
                <p className="font-semibold text-white text-base truncate">{item.name}</p>
                <p className="text-[#b3b3b3] text-sm truncate">{item.album}</p>
                <p className="text-[#b3b3b3] text-sm">{item.duration}</p>
                <div className="text-right">
                  <button onClick={() => removeSong(item._id)} className="text-[#b3b3b3] hover:text-red-500 transition-colors cursor-pointer text-sm font-semibold opacity-0 group-hover:opacity-100">
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListSong;
