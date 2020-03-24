import React, { useState } from "react";
import "./App.css";

import SearchHeader from "./Components/SearchHeader/Index";
import ReactGA from "react-ga";
import MapContainer from "./Components/MapContainer/Index";

import useWindowDimension from "./Utils/useWindowDimension";
import checkIsDesktop from "./Utils/checkIsDesktop";
import getTodayStr from "./Utils/getTodayStr";

function initializeReactGA() {
  ReactGA.initialize("UA-154707070-1");
  ReactGA.pageview("/");
}

function App() {
  // coronamap
  const [date, setDate] = useState(getTodayStr());
  const [displayType, setDisplayType] = useState("pct");

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
        <MapContainer
          // onClick={setSelectedResort}
          height={height}
          isDesktop={isDesktop}
          displayType={displayType}
        />
      </div>
    </div>
  );
}

export default App;
