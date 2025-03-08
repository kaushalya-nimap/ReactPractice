import React from "react";
import "../App.css";
import "../Styles/Page6.css";
import BackgroundImg from "../assets/Page6Img/BackgroundPage6.png";
import Vector1 from "../assets/Page6Img/Vector1.png";
const Page6 = () => {
  return (
    <div
      className="page6-main-div"
      style={{
        backgroundImage: `linear-gradient(rgba(53, 25, 83, 0.6), rgba(53, 25, 83, 1)), url(${BackgroundImg})`,
      }}
    >
      <div className="sub-div">
        <div className="left">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p className="custom-head-text" style={{marginBottom:"inherit"}}>Get A Quote</p>
            <img
              src={Vector1}
              alt="vector"
             style={{width:"50%"}}
            />
          </div>
          <p className="custom-text">
            Please take the time to complete the following form and provide us
            with as much information as you are able to ensure we can deal with
            your request as promptly.
          </p>
        </div>
        <div className="right">
          <label>Full Name</label>
          <input type="text" placeholder="enter full name" />
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div style={{ width: "50%" }}>
              <label>Country</label>
              <br />
              <input
                type="text"
                placeholder="select country"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ width: "50%" }}>
              <label>Email ID</label>
              <input
                type="text"
                placeholder="enter mail id"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div style={{ width: "50%" }}>
              <label>Training you are looking for</label>
              <input
                type="text"
                placeholder="select training"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ width: "50%" }}>
              <label>Course Nature</label>
              <input
                type="text"
                placeholder="select course"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <label>Message</label>
          <textarea type="text" placeholder="write your message..." />
          <button className="contact-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Page6;
