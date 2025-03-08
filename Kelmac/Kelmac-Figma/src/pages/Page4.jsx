import React, { useState } from "react";
import Logo1 from "../assets/Page4Img/Logo1.png";
import Logo2 from "../assets/Page4Img/Logo2.png";
import Logo3 from "../assets/Page4Img/Logo3.png";
import Logo4 from "../assets/Page4Img/Logo4.png";
import Logo5 from "../assets/Page4Img/Logo5.png";

import "../Styles/Page4.css";
const Page4 = () => {
  const [activeCard, setActiveCard] = useState(1);
  const cardObj = [
    {
      id: 1,
      title: "Cost-Effective",
      heading: "Training Solution",
      desc: "Reduce costs per participant through group pricing, making it more affordable than individual enrolments. Virtual or on-site delivery eliminates travel and accommodation expenses. Customized programs accelerate compliance and boost team efficiency. Achievea faster return on investment with tailored, business-focused learning",
      color1: "#FF8AB6",
      color2: "#F65585",
      logo: Logo1,
    },
    {
      id: 2,
      title: "Cost-Effective",
      heading: "Training Solution",
      desc: "Reduce costs per participant through group pricing, making it more affordable than individual enrolments. Virtual or on-site delivery eliminates travel and accommodation expenses. Customized programs accelerate compliance and boost team efficiency. Achievea faster return on investment with tailored, business-focused learning",
      color1: "#AD9EFC",
      color2: "#8C7AFB",
      logo: Logo2,
    },
    {
      id: 3,
      title: "Cost-Effective",
      heading: "Training Solution",
      desc: "Reduce costs per participant through group pricing, making it more affordable than individual enrolments. Virtual or on-site delivery eliminates travel and accommodation expenses. Customized programs accelerate compliance and boost team efficiency. Achievea faster return on investment with tailored, business-focused learning",
      color1: "#87E5FC",
      color2: "#45C6E8",
      logo: Logo3,
    },
    {
      id: 4,
      title: "Cost-Effective",
      heading: "Training Solution",
      desc: "Reduce costs per participant through group pricing, making it more affordable than individual enrolments. Virtual or on-site delivery eliminates travel and accommodation expenses. Customized programs accelerate compliance and boost team efficiency. Achievea faster return on investment with tailored, business-focused learning",
      color1: "#FECF9A",
      color2: "#FF9D2A",
      logo: Logo4,
    },
    {
      id: 5,
      title: "Cost-Effective",
      heading: "Training Solution",
      desc: "Reduce costs per participant through group pricing, making it more affordable than individual enrolments. Virtual or on-site delivery eliminates travel and accommodation expenses. Customized programs accelerate compliance and boost team efficiency. Achievea faster return on investment with tailored, business-focused learning",
      color1: "#A0EAD3",
      color2: "#36BE93",
      logo: Logo5,
    },
  ];
  const handleToggle = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };
  return (
    <div className="main-div-page4">
      <h2>The Benefits of Private In-House Training</h2>

      <div className="cards-container">
        {cardObj.map((card) => (
          <div
            key={card.id}
            className={`card-page4 ${activeCard === card.id ? "active" : ""}`}
            onClick={() => handleToggle(card.id)}
            style={{
              background: `linear-gradient(135deg, ${card.color1}, ${card.color2})`,
            }}
          >
            <img src={card.logo} alt="ui-image" />
            <h3>{card.title}</h3>
            <h4>{card.heading}</h4>
          </div>
        ))}
      </div>

      {activeCard !== null && (
        <div
          className="description-container"
          style={{
            background: `linear-gradient(135deg, ${
              cardObj.find((card) => card.id === activeCard)?.color1
            }, ${cardObj.find((card) => card.id === activeCard)?.color2})`,
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {cardObj.find((card) => card.id === activeCard)?.desc}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page4;
