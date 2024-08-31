import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Users } from "../components/Users";
import { Profile } from "../components/Profile";
import { Categories } from "../components/categories/Categories";

export const PanelLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigator = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarProps = window.innerWidth <= 991 ? { isSidebarOpen } : {};

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigator("/admin/login");
    }
  }, [])
  

  return (
    <div dir="rtl" className="d-flex font justify-content-end">
      <Sidebar {...sidebarProps} />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
        <Routes>
            <Route path="/*" element={<Dashboard/>}/>
            <Route path="/users" element={<Users/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/categories" element={<Categories/>} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};
