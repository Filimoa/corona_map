import React, { useState, useEffect } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import { quarantineLayer, fillLayer } from "./map-style";

import groupGeojson from "../../Utils/groupGeojson";
import getAsyncData from "../../Utils/getAsyncData";

import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

function MainMap(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAsyncData("/get-state-geojson").then(data => setData(data));
  }, []);

  // filtering data when date changes
  useEffect(() => {
    if (data) {
      const format_date = props.displayType + "-" + props.date;

      const updatedData = Object.assign(
        {},
        groupGeojson(data, f => f.properties[format_date], props.displayType)
      );
      setData(updatedData);
    }
  }, [props.date, props.displayType]);

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

  //display resort sidebar when resort icon clicked
  const _onClick = e => {
    if (e.features[0]) {
      props.onClick(e.features[0]["properties"]);
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
      </MapGL>
    </div>
  );
}

export default MainMap;
