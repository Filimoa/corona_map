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

  return (
    <div>
      <BarChart width={300} height={150} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="val" fill="#808080" />
      </BarChart>
    </div>
  );
}
