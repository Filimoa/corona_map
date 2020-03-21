import React, { useState } from "react";
import { Input, Slider } from "antd";
import Dropdown from "./Dropdown";
import CascadingDropdown from "./CascadingDropdown";
import ResortSelect from "./ResortSelect";

import logo from "../../Assets/powdamap_logo.png";
import "./styles.css";
import "antd/dist/antd.css";

export default function SearchHeader(props) {
  const passOptions = {
    noFilter: "Show all",
    Ikon: "Ikon Pass",
    Epic: "Epic Pass"
  };

  return (
    <div>
      <img src={logo} className="logo" />
      <div className="search-header">
        <div className="days-out-dropdown-container">
          <CascadingDropdown
            className="days-out-dropdown"
            value={props.forecastTimeframe}
            setValue={props.setForecastTimeframe}
          />
        </div>
        <div className="pass-dropdown-container">
          <Dropdown
            style={{ marginLeft: "10px" }}
            value={props.passFilter}
            setValue={props.setPassFilter}
            items={passOptions}
            menuDisplayName={"Season Pass Filter"}
          />
        </div>
        <Slider defaultValue={30} className="slider" />
      </div>
    </div>
  );
}
