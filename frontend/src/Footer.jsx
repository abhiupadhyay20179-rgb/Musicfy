import React from 'react'
import { Link } from 'react-router-dom'
import instaIcon from './assets/instaicon.svg';
import twitterIcon from './assets/twittericon.svg';
import facebookIcon from './assets/facebookicon.svg';

const Footer = () => {
  return (
    <div> <div className="mt-auto mb-0">
        <div className="bg-[#2a2a2a] h-px w-auto mx-8"></div>
        
        <div className="flex flex-wrap justify-between mt-10 mx-8 gap-6">
          <div className="text-[#a7a7a7] text-sm font-semibold flex flex-wrap gap-50">
            <div className="flex flex-col space-y-3">
              <h3 className="font-bold text-white text-base">Company</h3>
              <Link to="" className="hover:text-white hover:underline">About</Link>
              <Link to="" className="hover:text-white hover:underline">Jobs</Link>
              <Link to="" className="hover:text-white hover:underline">For the Record</Link>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="font-bold text-white text-base">Communities</h3>
              <Link to="" className="hover:text-white hover:underline">For Artists</Link>
              <Link to="" className="hover:text-white hover:underline">Developers</Link>
              <Link to="" className="hover:text-white hover:underline">Advertising</Link>
              <Link to="" className="hover:text-white hover:underline">Investors</Link>
              <Link to="" className="hover:text-white hover:underline">Vendors</Link>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="font-bold text-white text-base">Useful links</h3>
              <Link to="" className="hover:text-white hover:underline">Support</Link>
              <Link to="" className="hover:text-white hover:underline">Free Mobile App</Link>
              <Link to="" className="hover:text-white hover:underline">Popular by Country</Link>
              <Link to="" className="hover:text-white hover:underline">Import your music</Link>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="font-bold text-white text-base">Spotify Plans</h3>
              <Link to="" className="hover:text-white hover:underline">Premium Lite</Link>
              <Link to="" className="hover:text-white hover:underline">Premium Standard</Link>
              <Link to="" className="hover:text-white hover:underline">Premium Platinum</Link>
              <Link to="" className="hover:text-white hover:underline">Premium Student</Link>
              <Link to="" className="hover:text-white hover:underline">Spotify Free</Link>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-[#292929] hover:bg-[#4d4d4d] p-2 rounded-full cursor-pointer h-10 w-10 flex items-center justify-center">
              <img src={instaIcon} alt="Instagram" className="h-5 w-5 invert" />
            </div>
            <div className="bg-[#292929] hover:bg-[#4d4d4d] p-2 rounded-full cursor-pointer h-10 w-10 flex items-center justify-center">
              <img src={twitterIcon} alt="Twitter" className="h-5 w-5 invert" />
            </div>
            <div className="bg-[#292929] hover:bg-[#4d4d4d] p-2 rounded-full cursor-pointer h-10 w-10 flex items-center justify-center">
              <img src={facebookIcon} alt="Facebook" className="h-5 w-5 invert" />
            </div>
          </div>
        </div>

        <div className="bg-[#2a2a2a] h-px w-auto mx-8 mt-10"></div>
        <div className="mx-8 mt-6 mb-10">
       
        </div>
      </div></div>
  )
}

export default Footer