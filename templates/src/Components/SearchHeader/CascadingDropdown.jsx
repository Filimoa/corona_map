import React, { useState } from "react";
import "./styles.css";
import { Icon, Menu, Dropdown as AntDropdown, Button } from "antd";

const timeframeOptions = {
  "Snow Report": {
    "-1": "Yesterday",
    "-2": "Last 2 days",
    "-3": "Last 3 days",
    "-5": "Last 5 days",
    "-10": "Last 10 days"
  },
  "Snow Forecast": {
    "0": "Forecast for today",
    "1": "Total through tommorow",
    "3": "Total for next 3 days",
    "5": "Total for next 5 days",
    "7": "Total for next 7 days"
  }
};

const timeframeItems = {
  ...timeframeOptions["Snow Report"],
  ...timeframeOptions["Snow Forecast"]
};

const { SubMenu } = Menu;

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export default function CascadingDropdown(props) {
  // this code can be significantly improved but since this was becoming a one off
  // component it didn't make sense to make it easily reusable

  // display selected menu item when clicked
  let menuDisplayName = null;
  if (props.menuDisplayName) {
    menuDisplayName = props.menuDisplayName;
  } else {
    menuDisplayName = timeframeItems[props.value];
  }
  const [selectedItem, setSelectedItem] = useState(menuDisplayName);

  function handleMenuClick(e) {
    setSelectedItem(e.key);
    props.setValue(getKeyByValue(timeframeItems, e.key));
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <SubMenu title="Past Snow">
        {Object.values(timeframeOptions["Snow Report"]).map(item => (
          <Menu.Item key={item}>{item}</Menu.Item>
        ))}
      </SubMenu>
      <SubMenu title="Snow Forecast">
        {Object.values(timeframeOptions["Snow Forecast"]).map(item => (
          <Menu.Item key={item}>{item}</Menu.Item>
        ))}
      </SubMenu>
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
