import React, { useState } from "react";
import "./styles.css";
import { Icon, Menu, Dropdown as AntDropdown, Button } from "antd";

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export default function Dropdown(props) {
  // display selected menu item when clicked
  let menuDisplayName = null;
  if (props.menuDisplayName) {
    menuDisplayName = props.menuDisplayName;
  } else {
    menuDisplayName = props.items[props.value];
  }
  const [selectedItem, setSelectedItem] = useState(menuDisplayName);

  function handleMenuClick(e) {
    setSelectedItem(e.key);
    props.setValue(getKeyByValue(props.items, e.key));
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {Object.values(props.items).map(item => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <AntDropdown
      overlayClassName="days-out-dropdown"
      overlay={menu}
      placement="bottomLeft"
    >
      <Button size="large">
        {selectedItem}
        <Icon type="down" />
      </Button>
    </AntDropdown>
  );
}
