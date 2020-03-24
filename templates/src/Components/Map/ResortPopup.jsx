import React from "react";
import { Popup } from "react-map-gl";

export default function StatePopup(props) {
  return (
    <Popup
      latitude={props.lat}
      longitude={props.long}
      closeButton={props.closeButton}
      onClose={props.onClose}
    >
      <div className="hover-info">
        <h1>{props.resort_name}</h1>
        <p>{props.forecastText}</p>
      </div>
    </Popup>
  );
}
