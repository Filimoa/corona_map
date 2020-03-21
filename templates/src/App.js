import React, { useState, useEffect } from "react";
import "./App.css";

import SearchHeader from "./Components/SearchHeader/Index";
import ReactGA from "react-ga";
import Sidebar from "./Components/Sidebar/Index";
import MainMap from "./Components/Map/Index";

import getAsyncData from "./Utils/getAsyncData";
import getSnowGeojson from "./Utils/getSnowGeojson";
import filterResortByPass from "./Utils/filterResortByPass";
import useWindowDimension from "./Utils/useWindowDimension";
import getMapWidth from "./Utils/getMapWidth";
import checkIsDesktop from "./Utils/checkIsDesktop";
import ScrollbarSize from "react-scrollbar-size";

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
  const [changeData, setChangeData] = useState(null);

  const [scrollSize, setScrollSize] = useState(0);
  const { height, width } = useWindowDimension();

  let isDesktop = checkIsDesktop(width);

  initializeReactGA();

  //animation

  // get intitial sidebar resort
  useEffect(() => {
    getAsyncData("/get-state-geojson").then(data => setChangeData(data));
  }, []);

  // get snow data based on days out
  // useEffect(() => {
  //   getSnowGeojson(forecastTimeframe).then(data => setSnowData(data));
  // }, [forecastTimeframe]);

  // // LONG TERM
  // useEffect(() => {
  //   getAsyncData("/get-state-geojson").then(geojson => {
  //     setResortData(filterResortByPass(geojson, passFitler));
  //   });
  // }, [passFitler]);

  return (
    <div>
      <script src="http://localhost:8097"></script>
      <SearchHeader
        className="main-header"
        setUserLocation={setUserLocation}
        resortData={resortData}
        forecastTimeframe={forecastTimeframe}
        setForecastTimeframe={setForecastTimeframe}
        passFitler={passFitler}
        setPassFilter={setPassFilter}
      />
      <div className="main-content">
        <MainMap
          changeData={changeData}
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
