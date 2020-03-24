import React, { useState } from "react";
import { Slider } from "antd";
import intToDate from "../../Utils/intToDate";
import dateDiffInDays from "../../Utils/dateDiffInDays";

import "./styles.css";
import "antd/dist/antd.css";
import getTodayStr from "../../Utils/getTodayStr";

export default function DateSlider(props) {
  const [intDate, setIntDate] = useState(20);

  const slider_style = {
    sliderRailBackgroundColor: "black"
  };

  // up to yesterday
  const max_val = dateDiffInDays("2020-03-4", getTodayStr()) - 1;

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
          defaultValue={max_val}
          onChange={onSliderChange}
          max={max_val}
        />
      </div>
    </div>
  );
}
