import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import { Route, Routes } from "react-router-dom";
import { Users } from "../components/Users";
import { Profile } from "../components/Profile";

export const PanelLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarProps = window.innerWidth <= 991 ? { isSidebarOpen } : {};

  return (
    <div dir="rtl" className="d-flex font justify-content-end">
      <Sidebar {...sidebarProps} />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
        <Routes>
            <Route path="/*" element={<Dashboard/>}/>
            <Route path="/users" element={<Users/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};
