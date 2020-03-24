import React, { useState } from "react";

import DateSlider from ".././Slider/Index";
import MainMap from ".././Map/Index";
import Legend from ".././Legend/Index";
import getTodayStr from "../../Utils/getTodayStr";

import "./styles.css";
import "antd/dist/antd.css";

export default function MapContainer(props) {
  const legend_style = {
    position: "fixed",
    top: props.height - 200,
    left: "30px",
    zindex: "5"
  };

  // FIXME change to getTodayStr()
  const [date, setDate] = useState("2020-3-4");

  return (
    <div className="map-container">
      <div className="map">
        <MainMap
          onClick={props.setSelectedResort}
          displayType={props.displayType}
          isDesktop={props.isDesktop}
          date={date}
        />
      </div>
      <div className="slider-container">
        <DateSlider setDate={setDate} />
      </div>
      <div style={legend_style}>
        <Legend className="map-legend" displayType={props.displayType} />
      </div>
    </div>
  );
}
