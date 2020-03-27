import React from "react";
import { Descriptions, Modal } from "antd";
import Graph from "./Graph";

import "./styles.css";

export default function StatePopup(props) {
  // is this dangerous , in case of missing data
  const cases = props["cases-" + props.date];
  const tests = props["tests-" + props.date];
  const deaths = props["deaths-" + props.date];
  const doubling = props["pct-" + props.date] + " days";

  function dateHeadingFormatter(dateInput) {
    const date = new Date(dateInput);
    const month = date.toLocaleString("default", { month: "long" });
    const day = String(date.getDate());

    return "On " + month + " " + day;
  }

  const headingTitle = dateHeadingFormatter(props.date.replace(/-/g, "/"));

  return (
    <Modal
      footer={null}
      visible={props.isOpen}
      onCancel={() => props.close(false)}
      width={370}
      className="resort-popup-mobile"
      bodyStyle={{ padding: "0px" }}
    >
      <div className="state-popup">
        <div className="heading-popup">{props.state}</div>
        <div className="stats">
          <Descriptions
            bordered={true}
            size="small"
            column={1}
            title={headingTitle}
          >
            <Descriptions.Item label="Total Cases">{cases}</Descriptions.Item>
            <Descriptions.Item label="Deaths">{deaths}</Descriptions.Item>
            <Descriptions.Item label="Total Tests">{tests}</Descriptions.Item>
            <Descriptions.Item label="Case Doubling Rate">
              {doubling}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="graph">
          <Graph {...props} date={props.date} />
        </div>
      </div>
    </Modal>
  );
}
