import React from "react";
import BackgroundImg from "../assets/Page3Img/backgroundPage3.png";
import OverlayImg from "../assets/Page3Img/OverlayImg.png";
import "../App.css"
import "../Styles/Page3.css"
const Page3 = () => {
  return (
    <div
      className="main-div"
      style={{
        position: "relative",
        backgroundImage: `url(${BackgroundImg})`,     
      }}
    >
      {/* <img className='main-div' style={{ backgroundImage: `url(${OverlayImg})`, backgroundPosition: "center", height: "100%",width:"100%" }}></img>
      <div className="img-div" style={{ 
        position:"absolute",
        display: "flex" ,
        top:"50%",
        right:"5%",
        backgroundImage: `url(${OverlayImg})`,
        backgroundSize: "cover",
        height: "100vh",
        width:"100%",
        }}>
       
      </div> */}
      {/* <div
        className="img-div"
        style={{
          position: "absolute",
          top: "50%",
          right: "5%", // Adjusts distance from the right
          transform: "translateY(-50%)", // Centers the image vertically
          maxWidth: "40%", // Ensures the overlay does not exceed the background image
        }}
      >
        <img
          src={OverlayImg}
          alt="Overlay"
          style={{ width: "100%", height: "auto", borderRadius: "20px" }}
        />
      </div> */}
        {/* <div className="overlay-card">
        <h2>Customized programs tailored to client requirements!</h2>
        <p>Fully Tailored to Your Business Needs</p>
        <h3>No two businesses are the same</h3>
        <p>
          So why settle for a one-size-fits-all training program? Kelmac Group’s
          private training is designed specifically for you.
        </p>
        <h3>Customized to Your Industry & Company Processes</h3>
        <p>
          We take the time to understand your organization, your industry, and
          your unique challenges.
        </p>
        <h3>Relevant, Real-World Training</h3>
        <p>
          Instead of covering theoretical concepts, our training integrates
          real-world scenarios, case studies, and practical exercises.
        </p>
        <h3>Targeted Learning for Different Teams</h3>
        <p>
          Whether you need to train senior management, internal auditors, or
          frontline employees, we ensure each group gets the most value.
        </p>
      </div> */}
      <div className="overlay-card">
      <h2>Customized programs tailored to client requirements!</h2>
          <p className="small-text-box">Fully Tailored to Your Business Needs</p>
          <h3>No two businesses are the same</h3>
          <p className="small-para">
            So why settle for a one-size-fits-all training program? Kelmac Group’s
            private training is designed specifically for you.
          </p>

          <h3>Customized to Your Industry & Company Processes</h3>
          <p className="small-para">
            We take the time to understand your organization, your industry, and your unique challenges. Our courses are then tailored to focus on the specific skills and knowledge your team needs.
          </p>

          <h3>Relevant, Real-World Training</h3>
          <p className="small-para">
            Instead of covering theoretical concepts that may not apply to your team, our training integrates real-world scenarios, case studies, and practical exercises related to your company’s operations.
          </p>

          <h3>Targeted Learning for Different Teams</h3>
          <p className="small-para">
            Whether you need to train senior management, internal auditors, or frontline employees, we adjust the content to ensure each group gets the most value from the session.
          </p>
      </div>
    </div>
  );
};

export default Page3;
