import React, { useState } from "react";
import { Slider } from "antd";
import intToDate from "../../Utils/intToDate";
import dateDiffInDays from "../../Utils/dateDiffInDays";
import getTodayStr from "../../Utils/getTodayStr";

import "./styles.css";
import "antd/dist/antd.css";

export default function DateSlider(props) {
  const [intDate, setIntDate] = useState(20);

  const slider_style = {
    sliderRailBackgroundColor: "black"
  };

  // up to yesterday
  const max_val = dateDiffInDays("2020-03-4", getTodayStr());

  function onSliderChange(val) {
    setIntDate(val);
    props.setDate(intToDate(intDate));
  }

  function tipFormatter(int) {
    // slider is in integer units, need to display this as pretty date
    const date = new Date(intToDate(int - 1));
    const month = date.toLocaleString("default", { month: "long" });
    const day = String(date.getDate());

    return month + " " + day;
  }

  return (
    <div className="date-slider">
      <div className="heading">Date</div>
      <div className="slider">
        <Slider
          style={slider_style}
          tipFormatter={tipFormatter}
          defaultValue={max_val}
          onChange={onSliderChange}
          max={max_val}
        />
      </div>
    </div>
  );
}
