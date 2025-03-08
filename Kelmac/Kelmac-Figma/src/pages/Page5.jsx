import React from "react";
import "../App.css";
import "../Styles/Page5.css";
import Logo1 from "../assets/Page5Img/Logo1.png";
import Logo2 from "../assets/Page5Img/Logo2.png";
import Logo3 from "../assets/Page5Img/Logo3.png";
import Logo4 from "../assets/Page5Img/Logo4.png";
import Logo5 from "../assets/Page5Img/Logo1.png";

const Page5 = () => {
  return (
    <div className="page5-main-div" style={{ borderTopLeftRadius: "7rem" }}>
      <div className="sub-div">
        <div className="left">
          <p className="head">
            Why Kelmac Group is the Right Training Partner for Your Business?
          </p>
          <div className="img-title">
            <img src={Logo1} alt="logo" />
            <p className="title">Certified & Accredited Courses</p>
          </div>
          <p className="desc">
            Our training is internationally recognised, ensuring compliance with
            ISO standards and other industry regulations.
          </p>

          <div className="img-title">
            <img src={Logo2} alt="logo" />
            <p className="title">Tailored Content That Delivers Results</p>
          </div>
          <p className="desc">
            We customise every course to address your company’s unique needs,
            ensuring relevant and immediately applicable training.
          </p>
        </div>
        <div className="right">
          <div className="img-title">
            <img src={Logo3} alt="logo" />
            <p className="title">30+ Years of Expertise</p>
          </div>
          <p className="desc">
            We have trained thousands of professionals worldwide, helping
            businesses improve compliance, quality, and efficiency. ISO
            standards and other industry regulations.
          </p>

          <div className="img-title">
            <img src={Logo4} alt="logo" />
            <p className="title">
              Expert Instructors with Real-World Experience{" "}
            </p>
          </div>
          <p className="desc">
            Our trainers aren’t just educators—they’re industry professionals
            who understand your challenges and provide practical, actionable
            insights.
          </p>

          <div className="img-title">
            <img src={Logo5} alt="logo" />
            <p className="title">Proven Track Record of Success</p>
          </div>
          <p className="desc">
            Companies that train with Kelmac Group see increased employee
            performance, compliance improvement, and better operational
            efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page5;
