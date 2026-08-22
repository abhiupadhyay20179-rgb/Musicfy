import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminNavbar from './components/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="flex items-start min-h-screen bg-[#121212]">
      <AdminSidebar />
      <div className="flex-1 h-screen overflow-y-scroll">
        <AdminNavbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
