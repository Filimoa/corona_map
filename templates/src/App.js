import React, { useState, useEffect } from "react";
import "./App.css";

import SearchHeader from "./Components/SearchHeader/Index";
import ReactGA from "react-ga";
import MainMap from "./Components/Map/Index";

import getAsyncData from "./Utils/getAsyncData";
import useWindowDimension from "./Utils/useWindowDimension";
import checkIsDesktop from "./Utils/checkIsDesktop";
import ScrollbarSize from "react-scrollbar-size";
import groupGeojson from "./Utils/groupGeojson";

function initializeReactGA() {
  ReactGA.initialize("UA-154707070-1");
  ReactGA.pageview("/");
}

function App() {
  const [resortData, setResortData] = useState(null);
  const [snowData, setSnowData] = useState(null);
  const [selectedResort, setSelectedResort] = useState(null);
  const [forecastTimeframe, setForecastTimeframe] = useState(5);
  const [passFitler, setPassFilter] = useState("noFilter");
  const [userLocation, setUserLocation] = useState("");

  // coronamap
  const [data, setData] = useState(null);
  const [date, setDate] = useState();

  const [scrollSize, setScrollSize] = useState(0);
  const { height, width } = useWindowDimension();

  let isDesktop = checkIsDesktop(width);

  initializeReactGA();

  // get intitial sidebar resort
  useEffect(() => {
    getAsyncData("/get-state-geojson").then(data => setData(data));
  }, []);

  function onDateChange(newDate) {
    setDate(newDate);
    setData(groupGeojson(data, date));
  }

  return (
    <div>
      <script src="http://localhost:8097"></script>
      <SearchHeader className="main-header" setDate={onDateChange} />
      <div className="main-content">
        <MainMap
          changeData={data}
          resortData={resortData}
          snowData={snowData}
          onClick={setSelectedResort}
          setUserLocation={setUserLocation}
          userLocation={userLocation}
          forecastTimeframe={forecastTimeframe}
          isDesktop={isDesktop}
        />
      </div>
    </div>
  );
}

export default App;
