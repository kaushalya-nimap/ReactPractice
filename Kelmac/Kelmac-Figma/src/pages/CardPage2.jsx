import React from "react";
import "../App.css";
import "../Styles/CardPage2.css";
import Logo1 from "../assets/CardPage2Logo/Logo1.png";
import Logo2 from "../assets/CardPage2Logo/Logo2.png";
import Logo3 from "../assets/CardPage2Logo/Logo3.png";
import Logo4 from "../assets/CardPage2Logo/Logo4.png";
import Logo5 from "../assets/CardPage2Logo/Logo1.png";

const CardPage2 = () => {
  const obj = [
    {
      id: 1,
      title: "Greater Knowledge Transfer& Practical Application",
      desc: "Employees learn best when they can connect training to their daily tasks. Our in-house programs align course content with your company’s systems, policies, and workflows, ensuring that training is immediately applicable.",
      logo: Logo1,
      color:"#FFF4F8"
    },
    {
      id: 2,
      title: "Greater Knowledge Transfer& Practical Application",
      desc: "Employees learn best when they can connect training to their daily tasks. Our in-house programs align course content with your company’s systems, policies, and workflows, ensuring that training is immediately applicable.",
      logo: Logo2,
      color:"#F7F6FF"
    },
    {
      id: 3,
      title: "Greater Knowledge Transfer& Practical Application",
      desc: "Employees learn best when they can connect training to their daily tasks. Our in-house programs align course content with your company’s systems, policies, and workflows, ensuring that training is immediately applicable.",
      logo: Logo3,
      color:"#F3FDFF"
    },
    {
      id: 4,
      title: "Greater Knowledge Transfer& Practical Application",
      desc: "Employees learn best when they can connect training to their daily tasks. Our in-house programs align course content with your company’s systems, policies, and workflows, ensuring that training is immediately applicable.",
      logo: Logo4,
      color:"#FFF9F3"
    },
    {
      id: 5,
      title: "Greater Knowledge Transfer& Practical Application",
      desc: "Employees learn best when they can connect training to their daily tasks. Our in-house programs align course content with your company’s systems, policies, and workflows, ensuring that training is immediately applicable.",
      logo: Logo1,
      color:"#EFFFFA"
    },
  ];
  return (
    <>
    <div className="main-div-cardpage2">
      <div className="fixed">
        <p className="number">5</p>
        <p className="para">Key Reasons to Choose Private Training</p>
      </div>

      {obj.map((card) => (
        <div key={card.id} className="grid-item" style={{backgroundColor:card.color}}>
           <img src={card.logo} alt="" />
          <div className="text-item"> 
          <h2>{card.title}</h2>
          <p>{card.desc}</p>
          </div>          
        </div>
      ))}
      
    </div>
    <div className="btn-cardpage2">
    <button className="contact-button">Get a quote</button>
    <button className="whatsapp-button" style={{backgroundColor:"#ebeef1"}}>Whatsapp us</button>
  </div>
  </>
  );
};

export default CardPage2;
