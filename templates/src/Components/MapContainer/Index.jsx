import React, { useState } from "react";

import DateSlider from ".././Slider/Index";
import MainMap from ".././Map/Index";
import Legend from ".././Legend/Index";
import StatePopup from ".././StatePopup/Index";
import getTodayStr from "../../Utils/getTodayStr";

import { Modal } from "antd";

import "./styles.css";
import "antd/dist/antd.css";

const demo = {
  CENSUSAREA: 113594.084,
  GEO_ID: "0400000US04",
  LSAD: "",
  STATE: "04",
  "pct-2020-3-10": 60.0,
  "pct-2020-3-11": 56.0,
  "pct-2020-3-12": 56.0,
  "pct-2020-3-13": 56.0,
  "pct-2020-3-14": 60.0,
  "pct-2020-3-15": 46.0,
  "pct-2020-3-16": 60.0,
  "pct-2020-3-17": 64.0,
  "pct-2020-3-18": 66.0,
  "pct-2020-3-19": 93.0,
  "pct-2020-3-20": 92.0,
  "pct-2020-3-4": 200.0,
  "pct-2020-3-5": 100.0,
  "pct-2020-3-6": 83.0,
  "pct-2020-3-7": 87.0,
  "pct-2020-3-8": 70.0,
  "pct-2020-3-9": 70.0,
  pop: 72.78716999999999,
  state_short: "AZ"
};
export default function MapContainer(props) {
  const [chosenStateData, setChosenStateData] = useState(null);

  // FIXME change to getTodayStr()
  const [date, setDate] = useState("2020-3-4");
  const [modalOpen, setModalOpen] = useState(false);

  const legend_style = {
    position: "fixed",
    top: props.height - 300,
    left: "30px",
    zindex: "5"
  };

  // opening modal when state clicked
  function onSelect(event) {
    setChosenStateData(event);
    setModalOpen(true);
  }

  return (
    <div className="map-container">
      <StatePopup
        isOpen={modalOpen}
        close={setModalOpen}
        displayType={props.displayType}
        date={date}
        {...chosenStateData}
      />

      <div className="map">
        <MainMap
          onClick={onSelect}
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
