import React, { useState, useEffect } from "react";
import Popup from "../Popup/Index";
import getAsyncData from "../../Utils/getAsyncData";
import getStatePopupData from "../../Utils/getStatePopupData";

export default function PopupUSA(props) {
  // const popupData = getStatePopupData(props);

  return (
    <div>
      <Popup
        isOpen={props.isOpen}
        close={props.close}
        displayType={props.displayType}
        date={props.date}
        {...props}
      />
    </div>
  );
}
