// HomeLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/SideBar";
import Navbar from "../../shared/Navbar";
import "./Layout.css"
const HomeLayout = () => {
  return (
    <div className="mainDiv">
      <div className="leftSidebar">
        <Sidebar />
      </div>

      <div className="rightSidebar">
        <Navbar />

        <div className="contain">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
