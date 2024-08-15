import React from "react";
import "./InfoBox.scss";

const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p className="--color-white">{title}</p>
        <h4 className="--color-white">{count}</h4>
      </span>
    </div>
  );
};

export default InfoBox;
