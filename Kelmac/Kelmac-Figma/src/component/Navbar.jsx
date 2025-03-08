import React from "react";
import logo from "../assets/Navbar/image 1.png";
import contactNumber from "../assets/Navbar/number.png";
import telephoneLogo from "../assets/Navbar/Frame.png";
import "./Navbar.css"; // Import the CSS file
import "../App.css"

const Navbar = () => {
  return (
    <nav className="navbar">
     
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="navbar-content">
        <div className="contact-info">
          <img src={telephoneLogo} alt="Telephone" />
          <img src={contactNumber} alt="Contact Number" />
        </div>

        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Courses</a>
          </li>
          <li>
            <a href="#">Training</a>
          </li>
          <li>
            <button className="contact-button">Contact us</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
