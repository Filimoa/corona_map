import React, { useState } from "react";
import { Slider } from "antd";
import intToDate from "../../Utils/intToDate";

import logo from "../../Assets/powdamap_logo.png";
import "./styles.css";
import "antd/dist/antd.css";

export default function SearchHeader(props) {
  const [intDate, setIntDate] = useState(20);

  function onSliderChange(val) {
    setIntDate(val);
    props.setDate(intToDate(intDate));
  }

  return (
    <div>
      <img src={logo} className="logo" />
      <div className="search-header">
        <Slider
          tipFormatter={intToDate}
          // defaultValue={Object.keys(int_to_date).length - 1}
          onChange={onSliderChange}
          max={30}
          className="slider"
        />
      </div>
    </div>
  );
}
