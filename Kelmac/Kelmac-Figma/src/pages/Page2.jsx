import React from "react";
import Card from "../assets/Page2Img/Card.png";
import CardSLide from "../assets/Page2Img/CardSlider.png";
import BackgroundImg from "../assets/Page2Img/backgroundPage2.png";
import "../App.css";
import "../Styles/Page2.css"
import Bullet1 from "../assets/Page2Img/Bullet1.png";
import Bullet2 from "../assets/Page2Img/Bullet2.png";
import Bullet3 from "../assets/Page2Img/Bullet3.png";
import Bullet4 from "../assets/Page2Img/Bullet4.png";
import Bullet5 from "../assets/Page2Img/Bullet5.png";

const Page2 = () => {
  return (
    <div
      className="main-div"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      <div
        className="sub-div"
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
      >
        <p className="text-head-style">
          Why Choose Private & In-House Training?
        </p>
        <p className="text-head-bottom-style">
          Tailored Learning That Works for Your Business
        </p>

        <p className="text-style">
          Training isn’t just about ticking a box—it’s about equipping your team
          with the right skills and knowledge to drive real business impact. But
          public training courses often come with challenges that can make them
          less effective for organizations like yours:
        </p>

        <ul style={{ listStyle: "none",padding:"0" }}>
          <li>
            <img src={Bullet1} alt="bullet 1" />
            Generic content that doesn’t fully align with your business goals
          </li>
          <li>
            <img src={Bullet2} alt="bullet 1" />
            Inconvenient schedules that don’t fit your team’s availability
          </li>
          <li>
            <img src={Bullet3} alt="bullet 1" />
            Additional travel costs & time away from work
          </li>
          <li>
            <img src={Bullet4} alt="bullet 1" />
            Disruptions to daily business operations
          </li>
          <li>
            <img src={Bullet5} alt="bullet 1" />
            Lack of confidentiality when discussing company-specific challenges
          </li>

          <p className="text-style">
            Private, in-house training eliminates these barriers by bringing the
            learning experience directly to your organization—on your schedule,
            with your priorities in mind.
          </p>
        </ul>
        <div className="btn-div" style={{marginBottom:"38px"}}>
          <button className="contact-button">Get a quote</button>
          <button className="whatsapp-button">Whatsapp us</button>
        </div>
      </div>

      <p className="text-head-style">
        Our top training Programs
      </p>
    </div>
  );
};

export default Page2;
