import React from "react";
import BackgroundImg from "../assets/Page1Img/backgroundPage1.png";
import Vector1 from "../assets/Page1Img/Vector1.png";
import "../App.css";
import "../Styles/Page1.css";

const Page1 = () => {
  return (
    <div
      className="main-div"
      style={{
        backgroundImage: `linear-gradient(rgba(88, 30, 88, 0.86), rgba(120, 0, 131, 0.84)),url(${BackgroundImg})`,
      }}
    >
      <div className="sub-div">
        <div className="left">
          <p className="custom-head-text">
            Excellence Redefined:
            <br />
            Kelmac’s Training
            <br />
            Solutions -
            <span
              style={{
                color: "#EFBF04",
                display: "inline-block",
                position: "relative",
              }}
            >
              Tailored
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <img
                  src={Vector1}
                  style={{  display: "block" }}
                  alt="vector"
                />
              </div>
            </span>
          </p>
          <p className="custom-text">
            ISO training designed around your business needs—delivered when you
            need it, focused on what matters, and built to deliver measurable
            results
          </p>
          <div className="btn-div">
            <button className="contact-button">Get a quote</button>
            <button className="whatsapp-button">Whatsapp us</button>
          </div>
        </div>
        <div className="right">
          <label>Full Name</label>
          <input type="text" placeholder="enter full name" />
          <label>Email ID</label>
          <input type="text" placeholder="enter mail id" />
          <label>Training you are looking for</label>
          <input type="text" placeholder="select training" />
          <label>Course Nature</label>
          <input type="text" placeholder="select course" />
          <label>Country</label>
          <input type="text" placeholder="select country" />
          <label>Message</label>
          <textarea type="text" placeholder="write your message..." />
          <button className="contact-button">Submit</button>
        </div>
      </div>
      <p className="custom-head-text">
        Excellence Redefined:
        <br />
        Kelmac’s Training Solutions -{" "}
        <span
              style={{
                color: "#EFBF04",
                display: "inline-block",
                position: "relative",
              }}
            >
              Tailored
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <img
                  src={Vector1}
                  style={{  display: "block" }}
                  alt="vector"
                />
              </div>
            </span>
      </p>
      <p className="custom-text">
        We address the frustration of generic training by offering customized
        ISO solutions that focus only on your critical compliance and
        performance needs. Our flexible scheduling ensures training happens on
        your timeline, minimizing disruption while delivering immediate,
        actionable value. With expert-led sessions, we empower your team to
        achieve lasting improvements and certification success faster.
      </p>
    </div>
  );
};

export default Page1;
