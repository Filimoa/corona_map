export default function getStatePopupData(props) {
  const cases = props["cases-" + props.date];
  const tests = props["tests-" + props.date] + " ppl / case";
  const deaths = props["deaths-" + props.date];
  const doubling = props["pct-" + props.date] + " days";

  function dateHeadingFormatter(dateInput) {
    const date = new Date(dateInput);
    const month = date.toLocaleString("default", { month: "long" });
    const day = String(date.getDate());

    return "On " + month + " " + day;
  }

  const headingTitle = dateHeadingFormatter(props.date.replace(/-/g, "/"));

  return {
    cases: cases,
    tests: tests,
    deaths: deaths,
    doubling: doubling,
    headingTitle: headingTitle
  };
}
