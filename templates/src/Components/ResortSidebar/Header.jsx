import React from "react";
import IkonLogo from "../../Assets/ikon_logo.png";
import EpicLogo from "../../Assets/epic_logo.png";

import getForecastText from "../../Utils/getForecastText";

import "./styles.css";

export default function Header(props) {
  const forecastCol = "total-snow-" + props.forecastTimeframe;

  const forecastText = getForecastText(
    props[forecastCol],
    props.forecastTimeframe
  );

  let pass_logo;
  if (props.pass_type === "Ikon") {
    pass_logo = <img src={IkonLogo} className="logo-img" />;
  }
  if (props.pass_type === "Epic") {
    pass_logo = <img src={EpicLogo} className="logo-img" />;
  }

  return (
    <div className="header-main">
      <div className="header-text">
        <h1 className="header-title">{props.resort_name}</h1>
        <h2 className="header-7-day-forecast">{forecastText}</h2>
      </div>
      {pass_logo}
    </div>
  );
}
