import React from "react";
import "./styles.css";
import { FaCarSide } from "react-icons/fa";

export default function TravelDescription(props) {
  let travel_info = (
    <div className="add-address">Enter a zipcode to see travel info!</div>
  );

  if (props.car_time.length !== 0) {
    travel_info = (
      <div className="driving-stats">
        <p>{props.car_distance}</p>
        <div className="driving-time">
          <FaCarSide className="car-logo" />
          <p>{props.car_time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="travel-description">
      <div className="snapshot-header">TRAVEL STATS</div>
      <div>{travel_info}</div>
    </div>
  );
}
