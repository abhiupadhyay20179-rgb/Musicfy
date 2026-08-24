import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Displayhome from './Displayhome';
import Content from './Content';
import Content2 from './content2';
import Footer from './Footer';
import Albumcontent from './Albumcontent';


const Display = () => {
  return (
    <div className="flex-1 h-full bg-[#121212]   mr-2 rounded-md overflow-y-auto pb-10 flex flex-col">
      <div>
        <Routes>
          <Route index element={<Displayhome />} />
          <Route path="/home" element={<Displayhome />} />
          <Route path="/content/:index" element={<Content />} />
          <Route path="/Albumcontent/:index" element={<Albumcontent />} />
        </Routes>
      </div>

    </div>
  );
};

export default Display;