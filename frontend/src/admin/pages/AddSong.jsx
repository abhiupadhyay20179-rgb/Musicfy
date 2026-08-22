import React, { useState, useEffect } from 'react';
import { ImagePlus, Music, Check } from 'lucide-react';
import axios from 'axios';
import { url } from '../config';
import { toast } from 'react-toastify';

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [AlbumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('album', album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong " + error);
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error("Failed to load albums");
      }
    } catch (error) {
      toast.error("Something went wrong " + error);
    }
  };

  useEffect(() => {
    loadAlbumsData();
  }, []);

  return loading ? (
    <div className="grid place-items-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-[#1db954] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-[#1db954] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-[#1db954] rounded-full animate-bounce"></div>
        </div>
        <p className="text-[#b3b3b3] font-semibold text-sm tracking-widest uppercase">Adding Song...</p>
      </div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8 items-start text-white p-6">
      <div className="flex gap-8 flex-col w-full max-w-xl">

        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <p className='font-semibold text-[#b3b3b3]'>Upload Song</p>
            <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" accept="audio/*" hidden />
            <label htmlFor="song" className="cursor-pointer">
              <div className="w-24 h-24 bg-[#242424] flex items-center justify-center rounded-lg border-2 border-dashed border-[#535353] hover:border-[#1db954] transition-colors group">
                {song ? <Check className="w-8 h-8 text-[#1db954] transition-colors" /> : <Music className="w-8 h-8 text-[#b3b3b3] group-hover:text-[#1db954] transition-colors" />}
              </div>
            </label>
          </div>

          <div className='flex flex-col gap-4'>
            <p className='font-semibold text-[#b3b3b3]'>Upload Image</p>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
            <label htmlFor="image" className="cursor-pointer">
              <div className="w-24 h-24 bg-[#242424] flex items-center justify-center rounded-lg border-2 border-dashed border-[#535353] hover:border-[#1db954] transition-colors group">
                {image ? <img src={URL.createObjectURL(image)} className='w-full h-full object-cover rounded-md' alt="" /> : <ImagePlus className="w-8 h-8 text-[#b3b3b3] group-hover:text-[#1db954] transition-colors" />}
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className='font-semibold text-[#b3b3b3]'>Song Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Song Name" className="bg-[#242424] border border-[#535353] focus:border-[#1db954] text-white placeholder-[#b3b3b3] rounded-md p-2 outline-none transition-all w-full" required />
        </div>

        <div className="flex flex-col gap-4">
          <p className='font-semibold text-[#b3b3b3]'>Song Description</p>
          <input onChange={(e) => setDesc(e.target.value)} value={desc} type="text" placeholder="Song Description" className="bg-[#242424] border border-[#535353] focus:border-[#1db954] text-white placeholder-[#b3b3b3] rounded-md p-2 outline-none transition-all w-full" required />
        </div>

        <div className='flex flex-col gap-4'>
          <p className='font-semibold text-[#b3b3b3]'>Album</p>
          <select onChange={(e) => setAlbum(e.target.value)} value={album} className="bg-[#242424] border border-[#535353] focus:border-[#1db954] text-white rounded-md p-2 outline-none transition-all w-34" required>
            <option value="none">None</option>
            {AlbumData.map((item, index) => (<option key={index} value={item.name}>{item.name}</option>))}
          </select>
        </div>

        <button type="submit" className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold py-3 px-8 rounded-full w-fit mt-4 transition-colors cursor-pointer">
          Add Song
        </button>

      </div>
    </form>
  );
};

export default AddSong;
