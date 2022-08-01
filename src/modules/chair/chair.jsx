import React, { useState } from "react";

import "./booking.scss";

function Chair(props) {
  //   let classGheVip = props.item.loaiGhe === "Vip" ? "gheVip" : "";
  //   let classGheDaDat = props.item.daDat === true ? "daDat" : "";

  const [isSelected, setIsSelected] = useState(false);

  const populateClass = () => {
    let defaultClass = "ghe";
    if (props.item.loaiGhe === "Vip") {
      defaultClass += " gheVip";
    }

    if (isSelected) {
      defaultClass += " dangDat";
    }

    if (props.item.daDat) {
      defaultClass += " daDat";
    }

    return defaultClass;
  };

  return (
    <button
      disabled={props.item.daDat}
      onClick={() => {
        setIsSelected(!isSelected);
        props.handleSelect(props.item);
      }}
      className={populateClass()}
    >
      {props.item.tenGhe}
    </button>
  );
}

export default Chair;
