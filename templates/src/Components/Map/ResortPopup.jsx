import React from "react";
import { Popup } from "react-map-gl";
import getForecastText from "../../Utils/getForecastText";

export default function ResortPopup(props) {
  const forecastCol = "total-snow-" + props.forecastTimeframe;

  const forecastText = getForecastText(
    props[forecastCol],
    props.forecastTimeframe
  );

  let content = null;
  if (props.isDesktop) {
    content = (
      <Popup
        latitude={props.lat}
        longitude={props.long}
        closeButton={props.closeButton}
        onClose={props.onClose}
      >
        <div className="hover-info">
          <h1>{props.resort_name}</h1>
          <p>{forecastText}</p>
        </div>
      </Popup>
    );
  }

  return <div>{content}</div>;
}
