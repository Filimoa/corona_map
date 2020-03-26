import React from "react";
import { Descriptions, Modal } from "antd";
import Graph from "./Graph";

import "./styles.css";

export default function StatePopup(props) {
  // is this dangerous , in case of missing data
  const cases = props["cases-" + props.date];
  const tests = props["test-" + props.date];
  const deaths = props["test-" + props.deaths];
  const doubling = props["pct-" + props.doubling];

  console.log("serge");
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
        <div className="heading-popup">Ohio</div>
        <Descriptions className="stats" bordered={true} size="small" column={1}>
          <Descriptions.Item label="Total Cases">{cases}</Descriptions.Item>
          <Descriptions.Item label="Deaths">{deaths}</Descriptions.Item>
          <Descriptions.Item label="Total Tests">{tests}</Descriptions.Item>
          <Descriptions.Item label="Case Doubling Rate">
            {doubling}
          </Descriptions.Item>
        </Descriptions>
        <div className="graph">
          <Graph {...props} />
        </div>
      </div>
    </Modal>
  );
}
