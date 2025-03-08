import React from "react";
import "../Styles/CardPage.css";
import Logo1 from "../assets/CardPage1/Logo1.png";
import Logo2 from "../assets/CardPage1/Logo2.png";
import Logo3 from "../assets/CardPage1/Logo3.png";
import Logo4 from "../assets/CardPage1/Logo4.png";
import ISOLogo from "../assets/CardPage1/ISOLogo.png";

const CardPage = () => {
  const featureLogos = [Logo1, Logo2, Logo3, Logo4];
  const plans = [
    {
      id: 1,
      price: "₹32500",
      title: "ISO 9001:2015 Lead Auditor Training Course",
      description: "Quality Management",
      features: ["Virtual", "3 Mar 25 to 9 Mar 25", "4 days", "English"],
    },
    {
      id: 2,
      price: "₹32500",
      title: "ISO 9001:2015 Lead Auditor Training Course",
      description: "Great for businesses.",
      features: ["Virtual", "3 Mar 25 to 9 Mar 25", "4 days", "English"],
    },
    {
      id: 3,
      price: "₹32500",
      title: "ISO 9001:2015 Lead Auditor Training Course",
      description: "Best for professionals.",
      features: ["Virtual", "3 Mar 25 to 9 Mar 25", "4 days", "English"],
    },
    {
      id: 4,
      price: "₹32500",
      title: "ISO 9001:2015 Lead Auditor Training Course",
      description: "For large enterprises.",
      features: ["Virtual", "3 Mar 25 to 9 Mar 25", "4 days", "English"],
    },
  ];
  return (
    <div className="main-card-div">
      {plans.map((plan) => (
        <div className="card" key={plan.id}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3>{plan.price}</h3>
            <img src={ISOLogo} />
          </div>
          <h2 style={{ fontSize: "15px" }}>{plan.title}</h2>
          <p>{plan.description}</p>
          <ul>
            {plan.features.map((feature, index) => (
              <li key={index}>
                <img
                  src={featureLogos[index]} // Assigning correct logo from array
                  alt={`Feature Logo ${index}`}
                  style={{ width: "20px", marginRight: "8px" }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CardPage;
