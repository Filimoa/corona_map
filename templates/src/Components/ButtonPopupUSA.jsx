import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function ButtonPopupUSA(props) {
  const style = { width: "140px" };

  return (
    <button
      className="button-container"
      onClick={() => props.onClick(!props.isOpen)}
    >
      <div className="legend-closed" style={style}>
        <div className="heading">US Overview</div>
        <IoIosArrowForward className="IoIosArrowDown" />
      </div>
    </button>
  );
}
