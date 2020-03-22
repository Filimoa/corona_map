import React, { useState } from "react";
import { Slider } from "antd";
import intToDate from "../../Utils/intToDate";

import "./styles.css";
import "antd/dist/antd.css";

export default function DateSlider(props) {
  const [intDate, setIntDate] = useState(20);

  const slider_style = {
    "slider-rail-background-color": "black"
  };

  function onSliderChange(val) {
    setIntDate(val);
    props.setDate(intToDate(intDate));
  }

  return (
    <div className="date-slider">
      <div className="heading">Date</div>
      <div className="slider">
        <Slider
          style={slider_style}
          tipFormatter={intToDate}
          // defaultValue={Object.keys(int_to_date).length - 1}
          onChange={onSliderChange}
          max={30}
        />
      </div>
    </div>
  );
}
