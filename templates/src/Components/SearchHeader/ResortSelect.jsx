import React from "react";
import { Select } from "antd";
import gjfilter from "geojson-filter";

import "./styles.css";

// function to allow user
export default function ResortSelect(props) {
  const { Option } = Select;

  //creating option list from raw resort geojson
  let resortOptions = null;
  if (props.resortData) {
    resortOptions = Object.values(props.resortData["features"]).map(
      (key, index) => {
        const resort_name = key["properties"]["resort_name"];

        return (
          <Option value={resort_name} key={resort_name}>
            {resort_name}
          </Option>
        );
      }
    );
  }

  //
  const onSelect = e => {
    const filter = ["==", "resort_name", e];
    const selectedResort = gjfilter(props.resortData, filter).features[0][
      "properties"
    ];
    props.setSearchedResort(selectedResort);
  };

  return (
    <div>
      <Select
        showSearch
        onSelect={e => onSelect(e)}
        className="resort-search"
        size="large"
        placeholder="Find resort"
        optionFilterProp="children"
        notFoundContent="Not found"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {resortOptions}
      </Select>
    </div>
  );
}
