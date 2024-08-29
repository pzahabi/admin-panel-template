import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

export const PanelLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarProps = window.innerWidth <= 1024 ? { isSidebarOpen } : {};

  return (
    <div dir="rtl" className="d-flex font">
      <Sidebar {...sidebarProps} />
      <div className="w-100">
        <Navbar toggleSidebar={toggleSidebar} />
        <Dashboard />
        <Footer />
      </div>
    </div>
  );
};
