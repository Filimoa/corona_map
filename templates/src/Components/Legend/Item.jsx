import React from "react";
import styles from "./styles.css";

export default function Item(props) {
  const item_style = {
    width: "20px",
    height: "20px",
    background: props.color
  };

  return (
    <div className="menu-item">
      <div style={item_style}>&nbsp;</div>
      <div className="menu-item-text">{props.text}</div>
    </div>
  );
}
