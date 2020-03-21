import React from "react";
import ReadMoreReact from "read-more-react";

import "./styles.css";

export default function SnowReport(props) {
  let snow_report_text = <div>Not available</div>;
  if (props.description) {
    snow_report_text = (
      <ReadMoreReact
        text={props.description}
        readMoreText="Read More..."
        className="snow-report-text"
      />
    );
  }

  return (
    <div className="snow-report">
      <h1>Snow Report</h1>
      <div className="snow-report-text">{snow_report_text}</div>
    </div>
  );
}
