import React from "react";

interface Props {
  isSidebarOpen?: boolean;
}

const Sidebar = ({ isSidebarOpen }: Props) => {
    console.log(window.innerWidth)
  const open = window.innerWidth > 1024 ? true : typeof isSidebarOpen === "boolean" ? isSidebarOpen  : true;
  return (
    <>
      {open && <div className="bg-dark text-white p-3 vh-100" id="sideBar">
        <h2 className="text-center text-nowrap">Admin Panel</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Users
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Settings
            </a>
          </li>
        </ul>
      </div>}
    </>
  );
};

export default Sidebar;
