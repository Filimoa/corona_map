import React from "react";
import "./styles.css";

export default function Item(props) {
  const item_style = {
    width: props.width,
    height: props.height,
    background: props.color
  };

  return (
    <div className="menu-item">
      <div style={item_style}>&nbsp;</div>
      <div className="menu-item-text">{props.text}</div>
    </div>
  );
}
