import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import axios from 'axios';
import { url } from '../config';
import { toast } from 'react-toastify';

const AddAlbum = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#121212");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgcolor', colour);
      
      const response = await axios.post(`${url}/api/album/add`, formData);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDesc("");
        setImage(false);
        setColour("#121212");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="grid place-items-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-[#1db954] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-[#1db954] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-[#1db954] rounded-full animate-bounce"></div>
        </div>
        <p className="text-[#b3b3b3] font-semibold text-sm tracking-widest uppercase">Adding Album...</p>
      </div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8 items-start text-white p-6">
      <div className="flex gap-8 flex-col w-full max-w-xl">
        
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <p className='font-semibold text-[#b3b3b3]'>Album Image</p>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
            <label htmlFor="image" className="cursor-pointer">
              <div className="w-24 h-24 bg-[#242424] flex items-center justify-center rounded-lg border-2 border-dashed border-[#535353] hover:border-[#1db954] transition-colors group">
                {image ? <img src={URL.createObjectURL(image)} className='w-full h-full object-cover rounded-md' alt="" /> : <ImagePlus className="w-8 h-8 text-[#b3b3b3] group-hover:text-[#1db954] transition-colors" />}
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className='font-semibold text-[#b3b3b3]'>Album Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Album Name" className="bg-[#242424] border border-[#535353] focus:border-[#1db954] text-white placeholder-[#b3b3b3] rounded-md p-2 outline-none transition-all w-full" required /> 
        </div>

        <div className="flex flex-col gap-4">
          <p className='font-semibold text-[#b3b3b3]'>Album Description</p>
          <input onChange={(e) => setDesc(e.target.value)} value={desc} type="text" placeholder="Album Description" className="bg-[#242424] border border-[#535353] focus:border-[#1db954] text-white placeholder-[#b3b3b3] rounded-md p-2 outline-none transition-all w-full" required /> 
        </div>

        <div className='flex flex-col gap-4'> 
          <p className='font-semibold text-[#b3b3b3]'>Background Color</p>
          <input onChange={(e) => setColour(e.target.value)} value={colour} type="color" className="w-12 h-12 rounded-md cursor-pointer" />
        </div>
        
        <button type="submit" className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold py-3 px-8 rounded-full w-fit mt-4 transition-colors cursor-pointer">
          Add Album
        </button>

      </div>
    </form>
  );
};

export default AddAlbum;
