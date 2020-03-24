import getDateStr from "./getDateStr";

export default function getGraphData(props) {
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function dateFormatter(date) {
    const month = date.toLocaleString("default", { month: "short" });
    const day = String(date.getDate());

    return month + " " + day;
  }

  var graphData = [];

  const start_date = new Date("2020-3-19");

  for (var i = -10; i <= 0; i++) {
    var date = addDays(start_date, i);
    var date_str = props.displayType + "-" + getDateStr(date);
    var entry = { name: dateFormatter(date), val: props[date_str] };

    graphData.push(entry);
  }

  return graphData;
}
