import React, { useState, useEffect } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import { snowLayer, changeLayer } from "./map-style";

import ResortPopup from "./ResortPopup";

import legend from "../../Assets/snow_legend_v6.png";
import flattenGeojson from "../../Utils/flattenGeojson";

import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

function MainMap(props) {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

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
        interactiveLayerIds={["point"]}
        {...viewport}
      >
        <Source type="geojson" data={props.snowData}>
          <Layer {...snowLayer} />
        </Source>
        <Source id="my-data" type="geojson" data={props.changeData}>
          <Layer {...changeLayer} />
        </Source>
        {_renderPopup()}
      </MapGL>
      <img src={legend} className="legend" />
    </div>
  );
}

export default MainMap;
