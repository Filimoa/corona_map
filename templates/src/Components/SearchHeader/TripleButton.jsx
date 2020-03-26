import React, { useState } from "react";
import { Button } from "antd";

import "./styles.css";
import "antd/dist/antd.css";

export default function SearchHeader(props) {
  // way better ways of doing this
  const [buttonBackground1, setButtonBackground1] = useState(false);
  const [buttonBackground2, setButtonBackground2] = useState(true);
  const [buttonBackground3, setButtonBackground3] = useState(true);

  const button_style = {
    background: "#FF8184",
    borderColor: "#BE0005",
    color: "black"
  };

  // when button clicked change background / setState
  function onButtonClick1() {
    props.setVal("pct");
    setButtonBackground1(false);
    setButtonBackground2(true);
    setButtonBackground3(true);
  }

  function onButtonClick2() {
    props.setVal("cases");
    setButtonBackground1(true);
    setButtonBackground2(false);
    setButtonBackground3(true);
  }

  function onButtonClick3() {
    props.setVal("tests");
    setButtonBackground1(true);
    setButtonBackground2(true);
    setButtonBackground3(false);
  }

  return (
    <div>
      <div className="search-header">
        <Button
          type="primary"
          onClick={onButtonClick1}
          ghost={buttonBackground1}
          className="button-first"
          style={button_style}
          shape="round"
        >
          Doubling Rate
        </Button>
        <Button
          type="primary"
          onClick={onButtonClick2}
          ghost={buttonBackground2}
          className="button"
          style={button_style}
          shape="round"
        >
          Total Infections
        </Button>
        <Button
          type="primary"
          onClick={onButtonClick3}
          ghost={buttonBackground3}
          className="button"
          style={button_style}
          shape="round"
        >
          Total Tests
        </Button>
      </div>
    </div>
  );
}
