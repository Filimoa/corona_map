import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import "./styles.css";
import getGraphData from "../../Utils/getGraphData";

export default function Graph(props) {
  // get date data
  const data = getGraphData({ ...props });
  //   console.log(props);

  // get dependant variable data
  const data2 = [
    {
      name: "Page A",
      uv: 4000
    },
    {
      name: "Page B",
      uv: 3000
    },
    {
      name: "Page C",
      uv: 2000
    },
    {
      name: "Page D",
      uv: 2780
    },
    {
      name: "Page E",
      uv: 1890
    },
    {
      name: "Page F",
      uv: 2390
    },
    {
      name: "Page G",
      uv: 3490
    }
  ];

  return (
    <div className="state-popup">
      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="val" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
