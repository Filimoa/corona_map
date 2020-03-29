import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

import "./styles.css";
import getGraphData from "../../Utils/getGraphData";

const graph_titles = {
  pct: "Doubling Rate",
  tests: "Total Tests per case",
  cases: "Total Cases",
  deaths: "Fatalities"
};

export default function Graph(props) {
  let data = getGraphData({ ...props }, props.displayType);
  const graph_title = graph_titles[props.displayType];

  data.forEach(function(item, i) {
    if (item["val"] == 999) data[i]["val"] = null;
  });

  return (
    <div>
      <div className="graph-title">{graph_title}</div>
      <BarChart width={300} height={150} data={data}>
        <XAxis dataKey="name" />
        <YAxis scale="linear" />
        <Tooltip />
        <Bar dataKey="val" fill="#ff8184" />
      </BarChart>
    </div>
  );
}
