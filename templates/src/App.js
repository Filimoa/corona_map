import React, { useState, useEffect, useReducer } from "react";
import "./App.css";

import SearchHeader from "./Components/SearchHeader/Index";
import ReactGA from "react-ga";
import MainMap from "./Components/Map/Index";

import getAsyncData from "./Utils/getAsyncData";
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
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [scrollSize, setScrollSize] = useState(0);
  const { height, width } = useWindowDimension();

  let isDesktop = checkIsDesktop(width);

  initializeReactGA();

  // get intitial sidebar resort
  // useEffect(() => {
  //   getAsyncData("/get-state-geojson").then(data => setData(data));
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     const format_date = "pct-" + date;
  //     const geojson = data;

  //     for (var key of Object.keys(geojson.features)) {
  //       let num_cases = geojson.features[key].properties[format_date];

  //       if (num_cases < 50) {
  //         geojson.features[key].properties.group = 1;
  //       } else if (num_cases < 100) {
  //         geojson.features[key].properties.group = 2;
  //       } else if (num_cases < 150) {
  //         geojson.features[key].properties.group = 3;
  //       } else {
  //         geojson.features[key].properties.group = 4;
  //       }
  //       // geojson.features[key].pop();
  //       // forceUpdate();
  //       // groupGeojson2(data, f => f.properties[date])
  //     }
  //     setData(groupGeojson2(data, f => f.properties[date]));
  //   }
  // }, [date]);

  return (
    <div>
      <script src="http://localhost:8097"></script>
      <SearchHeader className="main-header" setDate={setDate} />
      <div className="main-content">
        <MainMap
          // changeData={data}
          onClick={setSelectedResort}
          isDesktop={isDesktop}
          date={date}
        />
      </div>
    </div>
  );
}

export default App;
