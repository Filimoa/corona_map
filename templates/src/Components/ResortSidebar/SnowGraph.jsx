import React from "react";
import "./styles.css";

export default function SnowGraph(props) {
  return (
    <div className="snow-graph">
      <h1>Forecast</h1>
      <div className="snow-graph-container">
        <img src={props.snow_graph} />
      </div>
    </div>
  );
}
