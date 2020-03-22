import React, { useState } from "react";
import DateSlider from ".././Slider/Index";
import MainMap from ".././Map/Index";
import intToDate from "../../Utils/intToDate";
import legend from "../../Assets/snow_legend_v6.png";

import "./styles.css";
import "antd/dist/antd.css";

export default function MapContainer(props) {
  const [date, setDate] = useState("2020-3-4");

  return (
    <div className="map-container">
      <div className="map">
        <MainMap
          onClick={props.setSelectedResort}
          isDesktop={props.isDesktop}
          date={date}
        />
      </div>
      <div className="slider-container">
        <DateSlider setDate={setDate} />
      </div>
      {/* <img src={legend} className="legend" /> */}
    </div>
  );
}
