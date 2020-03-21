import React, { useState } from "react";
import { Input } from "antd";
import Dropdown from "./Dropdown";
import CascadingDropdown from "./CascadingDropdown";
import ResortSelect from "./ResortSelect";

import logo from "../../Assets/powdamap_logo.png";
import "./styles.css";
import "antd/dist/antd.css";

export default function SearchHeader(props) {
  const [userLocation, setUserLocation] = useState("");
  const { Search } = Input;

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
        <div className="resort-search-container">
          <ResortSelect
            className="resort-search"
            resortData={props.resortData}
            setSearchedResort={props.setSearchedResort}
          />
        </div>
        <div className="zipcode-input-container">
          <Search
            style={{ width: "200px" }}
            onChange={e => setUserLocation(e.target.value)}
            onSearch={e => props.setUserLocation(userLocation)}
            value={userLocation}
            placeholder="Starting zipcode"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
