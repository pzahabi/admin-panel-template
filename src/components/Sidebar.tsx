import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  isSidebarOpen?: boolean;
}

const Sidebar = ({ isSidebarOpen }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(window.innerWidth > 991 ? true : !!isSidebarOpen);
    const handleResize = () => {
      setOpen(window.innerWidth > 991 || !!isSidebarOpen);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  return (
    <div
      className={`bg-dark text-white p-3 pe-1 vh-100 z-top ${
        open ? "open" : ""
      }`}
      id="sideBar"
    >
      <h2 className="text-center text-nowrap">پنل امین</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to={"/admin"} className="nav-link text-white text-nowrap">
            داشبورد
          </NavLink>
        </li>
        {localStorage.getItem("role") === "Admin" && (
          <li className="nav-item">
            <NavLink
              to={"/admin/users"}
              className="nav-link text-white text-nowrap"
            >
              کاربران
            </NavLink>
          </li>
        )}
        {(localStorage.getItem("role") === "Admin" || "operator") && (
          <>
            <li className="nav-item">
              <NavLink
                to={"/admin/categories"}
                className="nav-link text-white text-nowrap"
              >
                دسته بندی محصولات
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/admin/products"}
                className="nav-link text-white text-nowrap"
              >
                محصولات
              </NavLink>
            </li>
          </>
        )}
        <li className="nav-item">
          <NavLink
            to={"/admin/profile"}
            className="nav-link text-white text-nowrap"
          >
            تنظیمات
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
