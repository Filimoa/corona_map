import React, { useState, useEffect, useReducer } from "react";
import "./App.css";

import SearchHeader from "./Components/SearchHeader/Index";
import ReactGA from "react-ga";
import MainMap from "./Components/Map/Index";
import MapContainer from "./Components/MapContainer/Index";

import useWindowDimension from "./Utils/useWindowDimension";
import checkIsDesktop from "./Utils/checkIsDesktop";
import ScrollbarSize from "react-scrollbar-size";
import groupGeojson2 from "./Utils/groupGeojson";

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
  const [date, setDate] = useState("2020-3-4");
  const [displayType, setDisplayType] = useState("tot");

  const [scrollSize, setScrollSize] = useState(0);
  const { height, width } = useWindowDimension();

  let isDesktop = checkIsDesktop(width);

  initializeReactGA();

  return (
    <div>
      <script src="http://localhost:8097"></script>
      <SearchHeader
        className="main-header"
        setDate={setDate}
        setDisplayType={setDisplayType}
      />
      <div className="main-content">
        <MapContainer onClick={setSelectedResort} isDesktop={isDesktop} />
      </div>
    </div>
  );
}

export default App;
