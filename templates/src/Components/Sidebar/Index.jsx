import React, { useState, useEffect, useRef } from "react";
import ResortSidebar from "../ResortSidebar/Index";
import { Modal } from "antd";
// import "./styles.css";

export default function Sidebar(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialDidMount, setInitialDidMount] = useState(false);

  // opening modal if on mobile, skips initial open
  useEffect(() => {
    if (!props.isDesktop & initialDidMount) {
      setIsModalOpen(true);
    }

    // logging initial mount
    if (props.selectedResort) {
      setInitialDidMount(true);
    }
  }, [props.selectedResort]);

  let sidebar = (
    <ResortSidebar
      {...props.selectedResort}
      userLocation={props.userLocation}
      forecastTimeframe={props.forecastTimeframe}
      className="resort-sidebar"
    />
  );

  let resortInfo = null;

  if (props.isDesktop) {
    resortInfo = sidebar;
  } else {
    resortInfo = (
      <Modal
        footer={null}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={370}
        className="resort-popup-mobile"
        bodyStyle={{ padding: "0px" }}
      >
        {sidebar}
      </Modal>
    );
  }

  return <div>{resortInfo}</div>;
}
