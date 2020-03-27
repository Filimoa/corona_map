import React, { useState } from "react";

import Item from "./Item.jsx";
import ItemLine from "./ItemLine.jsx";
import { all_menu_text } from "./menu_text";
import { IoIosArrowDown } from "react-icons/io";
import "./styles.css";

export default function Legend(props) {
  const [isOpen, setIsOpen] = useState(false);
  const menu_text = all_menu_text[props.displayType];

  const body = Object.values(menu_text["items"]).map(item => (
    <Item
      key={item.color}
      color={item.color}
      text={item.text}
      width="20px"
      height="20px"
    />
  ));

  const legendOpen = (
    <div className="legend">
      <div className="heading">{menu_text["heading"]}</div>
      <div>{body}</div>
      <div className="heading">Quarantine</div>
      <ItemLine />
    </div>
  );

  const legendClosed = (
    <div className="legend-closed">
      <div className="heading">Legend</div>
      <IoIosArrowDown className="IoIosArrowDown" />
    </div>
  );

  return (
    <button className="button-container" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? legendOpen : legendClosed}
    </button>
  );
}
