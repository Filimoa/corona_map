import React from "react";
import { Button } from "antd";

import "./styles.css";

export default function SnapshotDescription(props) {
  return (
    <div className="snapshot">
      <div className="snapshot-header">Mountain Stats</div>
      <p className="snapshot-info">
        ${props.daily_pass} Daily Pass <br />
        {props.lifts_open} / {props.lifts_total} Lifts Open <br />
        {props.runs_open} / {props.runs_total} Runs Open <br />
        {props.acreage_total} Total Acres <br />
        {props.ytd}" ytd <br />
      </p>
      <Button
        href={props.website_url}
        type="primary"
        shape="round"
        // type="link"
        className="website-button"
      >
        WEBSITE
      </Button>
    </div>
  );
}
