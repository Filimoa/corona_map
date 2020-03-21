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
  const [searchedResort, setSearchedResort] = useState(null);
  const [forecastTimeframe, setForecastTimeframe] = useState(5);
  const [passFitler, setPassFilter] = useState("noFilter");
  const [userLocation, setUserLocation] = useState("");

  const [scrollSize, setScrollSize] = useState(0);
  const { height, width } = useWindowDimension();

  let mapWidth = getMapWidth(width, scrollSize);
  let isDesktop = checkIsDesktop(width);

  initializeReactGA();

  //animation

  // get intitial sidebar resort
  useEffect(() => {
    getAsyncData("/get-starting-resort").then(data => setSelectedResort(data));
  }, []);

  // get snow data based on days out
  useEffect(() => {
    getSnowGeojson(forecastTimeframe).then(data => setSnowData(data));
  }, [forecastTimeframe]);

  //user adds a pass filter
  useEffect(() => {
    getAsyncData("/get-resort-geojson").then(geojson => {
      setResortData(filterResortByPass(geojson, passFitler));
    });
  }, [passFitler]);

  //if user specifically searches for resort, show this on sidebar
  useEffect(() => {
    if (searchedResort) {
      setSelectedResort(searchedResort);
    }
  }, [searchedResort]);

  return (
    <div>
      <script src="http://localhost:8097"></script>
      <SearchHeader
        className="main-header"
        setUserLocation={setUserLocation}
        resortData={resortData}
        setSearchedResort={setSearchedResort}
        forecastTimeframe={forecastTimeframe}
        setForecastTimeframe={setForecastTimeframe}
        passFitler={passFitler}
        setPassFilter={setPassFilter}
      />
      <div className="main-content">
        <MainMap
          resortData={resortData}
          snowData={snowData}
          searchedResort={searchedResort}
          onClick={setSelectedResort}
          setUserLocation={setUserLocation}
          userLocation={userLocation}
          forecastTimeframe={forecastTimeframe}
          width={mapWidth}
          isDesktop={isDesktop}
        />
        <Sidebar
          selectedResort={selectedResort}
          forecastTimeframe={forecastTimeframe}
          userLocation={userLocation}
          isDesktop={isDesktop}
          className="resort-sidebar"
        />
      </div>
      <ScrollbarSize onLoad={measurement => setScrollSize(measurement)} />
    </div>
  );
}

export default App;
