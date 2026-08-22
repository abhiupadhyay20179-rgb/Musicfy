import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './assets/play.png';
import { PlayerContext } from './Contex/PlayerContext';
import { toast } from 'react-toastify';


const Signup = () => {
  const {url, setToken, setUserData} = useContext(PlayerContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/register`, { name, email, password });

      if (response.data.success) {
        setToken(response.data.token);
        if (response.data.userData) {
          setUserData(response.data.userData);
        }
        toast.success("Account created successfully!");
        navigate('/');
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    }
  };
  return (
      <div className='w-full h-full bg-[#131212] pt-10 place-items-center text-amber-50 overflow-auto'>
      <div className='place-items-center '>
        <div className='place-items-center flex flex-col items-center'>
          <img className="invert cursor-pointer w-18 h-14" src={logo} alt="Musicfy"/> 
          <span className="text-2xl font-bold">Musicfy</span>
        </div>
        <div className='text-white font-bold text-4xl mt-4'><h1>Sign up to start listening</h1></div>
        <form onSubmit={onSubmitHandler} className="mt-8 flex flex-col items-center space-y-4 w-75">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full bg-[#292929] border border-gray-600 rounded-lg p-3 text-white outline-none focus:border-green-500"
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full bg-[#292929] border border-gray-600 rounded-lg p-3 text-white outline-none focus:border-green-500"
          />
          <input 
            type="password" 
            placeholder="Password (min 8 characters)" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full bg-[#292929] border border-gray-600 rounded-lg p-3 text-white outline-none focus:border-green-500"
          />
          <button type="submit" className='bg-green-500 text-black font-bold py-3 rounded-full hover:scale-105 w-full transition-transform'>
            Create Account
          </button>
        </form>
        <div className='mt-8 flex gap-2'>
          <span>Already have an account?</span>
          <Link to='/login' className='font-bold text-green-500 hover:underline'>Log in</Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;