import React from "react";

import TripleButton from "./TripleButton";
import logo from "../../Assets/coronamap_logo.png";

import "./styles.css";

export default function SearchHeader(props) {
  return (
    <div>
      <img src={logo} className="logo" />
      <div className="search-header">
        <TripleButton setVal={props.setDisplayType} />
      </div>
    </div>
  );
}
