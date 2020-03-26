import React, { useState, useEffect } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import { quarantineLayer, fillLayer } from "./map-style";

import groupGeojson from "../../Utils/groupGeojson";
import filterQuarantine from "../../Utils/filterQuarantine";
import getAsyncData from "../../Utils/getAsyncData";

import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

function MainMap(props) {
  const [data, setData] = useState(null);
  const [outlines, setOutlines] = useState(null);
  const [quarantineStatus, setQuarantineStatus] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 39,
    longitude: -98,
    zoom: 4
  });

  // initial data load
  useEffect(() => {
    getAsyncData("/get-state-geojson").then(data => setData(data));

    getAsyncData("/get-state-quarantines").then(data => {
      setQuarantineStatus(data);
    });

    getAsyncData("/get-quarantines-outlines").then(data => setOutlines(data));
  }, []);

  // filtering data when date changes
  useEffect(() => {
    if (data) {
      const format_date = props.displayType + "-" + props.date;

      // fill data
      const updatedData = Object.assign(
        {},
        groupGeojson(data, f => f.properties[format_date], props.displayType)
      );
      setData(updatedData);

      // line data
      const updatedOutlines = Object.assign(
        {},
        filterQuarantine(
          outlines,
          f => f.properties["state"],
          quarantineStatus,
          props.date
        )
      );
      setOutlines(updatedOutlines);
    }
  }, [props.date, props.displayType]);

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
        <Source type="geojson" data={outlines}>
          <Layer {...quarantineLayer} />
        </Source>
      </MapGL>
    </div>
  );
}

export default MainMap;
