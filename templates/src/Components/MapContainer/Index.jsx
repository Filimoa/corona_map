import React, { useState, useEffect } from "react";

import DateSlider from ".././Slider/Index";
import MainMap from ".././Map/Index";
import Legend from ".././Legend/Index";
import Popup from ".././Popup/Index";
import ButtonPopupUSA from "../ButtonPopupUSA";
import PopupUSA from ".././PopupUSA/Index";
// import PopUSA from ".././PopupUSA/Index";

import getYesterdayStr from "../../Utils/getYesterdayStr";
import getAsyncData from "../../Utils/getAsyncData";

import "./styles.css";
import "antd/dist/antd.css";

export default function MapContainer(props) {
  const [chosenStateData, setChosenStateData] = useState(null);
  const [USAData, setUSAData] = useState(null);
  const [date, setDate] = useState(getYesterdayStr);
  const [modalOpen, setModalOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);

  useEffect(() => {
    getAsyncData("/get-usa-data").then(data => {
      setUSAData(data);
    });
  }, []);

  // opening modal when state clicked
  function onSelect(event) {
    setChosenStateData(event);
    setModalOpen(true);
  }

  return (
    <div className="map-container">
      <Popup
        isOpen={modalOpen}
        close={setModalOpen}
        displayType={props.displayType}
        date={date}
        {...chosenStateData}
      />
      <PopupUSA
        isOpen={overviewOpen}
        close={setOverviewOpen}
        displayType={props.displayType}
        date={date}
        {...USAData}
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
      <div className="us-overview-container">
        <ButtonPopupUSA onClick={setOverviewOpen} isOpen={overviewOpen} />
      </div>

      <div className="legend-container">
        <Legend displayType={props.displayType} />
      </div>
    </div>
  );
}
