import React from "react";
import { Statistic } from "antd";
import Graph from "./Graph";

import "./styles.css";
import "antd/dist/antd.css";

export default function StatePopup(props) {
  // is this dangerous , in case of missing data
  const cases = props["cases-" + props.date];
  const tests = props["test-" + props.date];
  const deaths = props["test-" + props.deaths];
  const doubling = props["pct-" + props.doubling];

  return (
    <div className="state-popup">
      <div className="header">{props.state}</div>
      <Statistic title="Total Cases" value={cases} />
      <Statistic title="Total Tests" value={tests} />
      <Statistic title="Deaths" value={deaths} />
      <Statistic title="Case Doubling Rate" value={doubling} suffix="days" />
      <div>sergey</div>
      <Graph {...props} />
    </div>
  );
}
