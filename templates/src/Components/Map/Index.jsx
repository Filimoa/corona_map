import React, { useState, useEffect } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import { fillLayer } from "./map-style";

import ResortPopup from "./ResortPopup";
import groupGeojson2 from "../../Utils/groupGeojson2";
import getAsyncData from "../../Utils/getAsyncData";

import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

function MainMap(props) {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    getAsyncData("/get-state-geojson").then(data => setData(data));
  }, []);

  useEffect(() => {
    if (props.date != "2020-3-4") {
      const format_date = props.displayType + "-" + props.date;
      console.log(format_date);

      const updatedData = Object.assign(
        {},
        groupGeojson2(data, f => f.properties[format_date])
      );
      setData(updatedData);
    }
  }, [props.date]);

  // animation
  const [viewport, setViewport] = useState({
    latitude: 39,
    longitude: -98,
    zoom: 4
  });

  //user panning
  const _onViewportChange = viewport => {
    setViewport({ ...viewport });
  };

  // user hovering over resort icon
  const _onHover = event => {
    let stats = null;

    if (event.features && event.features.length) {
      stats = { ...event.features[0]["properties"] };
      stats["isDesktop"] = props.isDesktop;
      stats["forecastTimeframe"] = props.forecastTimeframe;
    }
    setHoverInfo(stats);
  };

  //creating resort popups
  const _renderPopup = props => {
    if (hoverInfo !== null) {
      return <ResortPopup {...hoverInfo} closeButton={false} />;
    }
    if (popupInfo) {
      return (
        <ResortPopup
          {...popupInfo}
          closeButton={true}
          onClose={() => setPopupInfo(null)}
        />
      );
    }
    return null;
  };

  //display resort sidebar when resort icon clicked
  const _onClick = e => {
    if (e.features[0]) {
      props.onClick(e.features[0].properties);
    }
  };

  return (
    <div className="map-container">
      <MapGL
        width="100vw"
        height="85vh"
        mapStyle="mapbox://styles/serjester/ck33r54pv2fab1crqyk8xuf89"
        mapboxApiAccessToken={MAPBOX_API_KEY}
        onViewportChange={_onViewportChange}
        onClick={event => _onClick(event)}
        interactiveLayerIds={["state-layer"]}
        {...viewport}
      >
        <Source type="geojson" data={data}>
          <Layer {...fillLayer} />
        </Source>
        {/* {_renderPopup()} */}
      </MapGL>
    </div>
  );
}

export default MainMap;
