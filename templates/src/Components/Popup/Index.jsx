import React from "react";
import { Descriptions, Modal } from "antd";
import Graph from "./Graph";
import getStatePopupData from "../../Utils/getStatePopupData";

import "./styles.css";

export default function StatePopup(props) {
  const data = getStatePopupData(props);

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
            title={data["headingTitle"]}
          >
            <Descriptions.Item label="Total Cases">
              {data["cases"]}
            </Descriptions.Item>
            <Descriptions.Item label="Deaths">
              {data["deaths"]}
            </Descriptions.Item>
            <Descriptions.Item label="Testing Ratio">
              {data["tests"]}
            </Descriptions.Item>
            <Descriptions.Item label="Case Doubling Rate">
              {data["doubling"]}
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
