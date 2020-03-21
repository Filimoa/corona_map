import React, { useState, useEffect } from "react";

import Header from "./Header";
import SnapshotDescription from "./SnapshotDescription";
import TravelDescription from "./TravelDescription";
import SnowReport from "./SnowReport";
import SnowGraph from "./SnowGraph";
import WebFont from "webfontloader";

import "./styles.css";

WebFont.load({
  google: {
    families: ["Coda:200", "Open Sans", "sans-serif", "Archivo Black"]
  }
});

// calling resort distance API
async function getTravelInfo(resortLocation, userLocation) {
  const api_url = "/get-routing-info";
  try {
    let response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ resortLocation, userLocation })
    });
    return response.json();
  } catch {
    let response = { distance: "N/A", duration: " N/A" };
    return response;
  }
}
export default function ResortSidebar(props) {
  const [resortDistance, setResortDistance] = useState("");
  const [resortDrivingTime, setResortDrivingTime] = useState("");
  const resortLocation = String(props.lat) + "," + String(props.long);

  //getting resort distance information
  useEffect(() => {
    if (props.userLocation.length > 3) {
      getTravelInfo(resortLocation, props.userLocation).then(function(
        response
      ) {
        setResortDistance(response["distance"]);
        setResortDrivingTime(response["duration"]);
      });
    }
  }, [props.resort_name]);

  return (
    <div className="resort-sidebar">
      <Header {...props} />
      <div className="img-and-snapshot-container">
        <SnapshotDescription
          daily_pass={props.daily_pass}
          runs_open={props.runs_open}
          runs_total={props.runs_total}
          lifts_open={props.lifts_open}
          lifts_total={props.lifts_total}
          acreage_total={props.acreage_total}
          ytd={props.ytd}
          website_url={props.website_url}
        />
        <img
          src={props.resort_img_url}
          alt="Image not found"
          className="resort-img"
        />
      </div>
      <TravelDescription
        car_distance={resortDistance}
        car_time={resortDrivingTime}
      />
      <SnowGraph
        snow_graph={props.graph_img_url}
        graph_title="Snowfall"
        className="snow-graph"
      />
      <SnowReport description={props.snow_report} />
    </div>
  );
}
