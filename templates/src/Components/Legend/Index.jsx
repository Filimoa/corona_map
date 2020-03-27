import React from "react";

import Item from "./Item.jsx";
import ItemLine from "./ItemLine.jsx";
import { all_menu_text } from "./menu_text";
import "./styles.css";

export default function Legend(props) {
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

  return (
    <div className="legend">
      <div className="heading">{menu_text["heading"]}</div>
      <div>{body}</div>;<div className="heading">Quarantine</div>
      <ItemLine />
    </div>
  );
}
