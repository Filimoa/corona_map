import React, { useState, useEffect } from "react";
import MapGL, { Marker, Layer, Source } from "react-map-gl";
import { snowLayer, resortLayer } from "./map-style";

import Pin from "./Pin";
import ResortPopup from "./ResortPopup";
import getResortViewport from "./getResortViewport";
import legend from "../../Assets/snow_legend_v6.png";
import getUserCords from "../../Utils/getUserCords";
import flattenGeojson from "../../Utils/flattenGeojson";
import gjfilter from "geojson-filter";

import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

function MainMap(props) {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [userCords, setUserCords] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  // animation

  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -105,
    zoom: 6
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

  const _renderMarker = props => {
    if (userCords != null) {
      return (
        <Marker longitude={userCords.longitude} latitude={userCords.latitude}>
          <Pin size={20} />
        </Marker>
      );
    }
  };

  //display resort sidebar when resort icon clicked
  const _onClick = e => {
    if (e.features[0]) {
      props.onClick(e.features[0].properties);
    }
  };

  //centering viewport when searched resort changes
  useEffect(() => {
    if (props.searchedResort && props.resortData) {
      const filter = ["==", "resort_name", props.searchedResort.resort_name];

      const resort = gjfilter(props.resortData, filter).features[0];

      const flatResort = flattenGeojson(resort);

      setViewport({ ...getResortViewport(flatResort) });

      setPopupInfo({ ...flatResort });
    }
  }, [props.searchedResort]);

  // creating marker for when user adds their location
  useEffect(() => {
    if (props.userLocation.length > 3) {
      getUserCords(props.userLocation).then(function(response) {
        setViewport({
          latitude: response.lat,
          longitude: response.lng,
          zoom: 8
        });

        props.setUserLocation(
          String(response.lat) + "," + String(response.lng)
        );
      });
    }
  }, [props.userLocation]);

  return (
    <div className="map-container">
      <MapGL
        width={props.width}
        height="85vh"
        mapStyle="mapbox://styles/serjester/ck33r54pv2fab1crqyk8xuf89"
        mapboxApiAccessToken={MAPBOX_API_KEY}
        onViewportChange={_onViewportChange}
        onHover={_onHover}
        onClick={event => _onClick(event)}
        interactiveLayerIds={["point"]}
        {...viewport}
      >
        <Source type="geojson" data={props.snowData}>
          <Layer {...snowLayer} />
        </Source>
        <Source id="my-data" type="geojson" data={props.resortData}>
          <Layer {...resortLayer} />
        </Source>
        {_renderPopup()}
        {_renderMarker()}
      </MapGL>
      <img src={legend} className="legend" />
    </div>
  );
}

export default MainMap;
