import React, { useState } from "react";
import "./App.css";

import SearchHeader from "./Components/SearchHeader/Index";
import ReactGA from "react-ga";
import MapContainer from "./Components/MapContainer/Index";

import useWindowDimension from "./Utils/useWindowDimension";
import checkIsDesktop from "./Utils/checkIsDesktop";

function initializeReactGA() {
  ReactGA.initialize("UA-154707070-1");
  ReactGA.pageview("/");
}

function App() {
  const [displayType, setDisplayType] = useState("pct");
  const { height, width } = useWindowDimension();
  let isDesktop = checkIsDesktop(width);

  initializeReactGA();

  return (
    <div>
      <script src="http://localhost:8097"></script>
      <SearchHeader className="main-header" setDisplayType={setDisplayType} />
      <div className="main-content">
        <MapContainer
          height={height}
          isDesktop={isDesktop}
          displayType={displayType}
        />
      </div>
    </div>
  );
}

export default App;
