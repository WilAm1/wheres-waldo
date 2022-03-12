import React, { useEffect, useState, useContext } from "react";
import { CheckCoordContext } from "./CheckCoordContext";
import OdlawIcon from "../assets/img/odlaw-icon.jpg";
import WizardIcon from "../assets/img/wizard-icon.jpg";
import WaldoIcon from "../assets/img/waldo-icon.jpg";
export default function NamesPopup({ position, display, handleRemove }) {
  const [isVisible, setIsVisible] = useState();
  const { isWithinCoordinates } = useContext(CheckCoordContext);
  const { x, y, computedX, computedY } = position;

  useEffect(() => {
    setIsVisible(display);
  });

  const handleClick = async (e, name) => {
    e.stopPropagation();
    //TODO have db checker on the position and character clicked
    setIsVisible(false);
    handleRemove(false);
    console.log(computedX, computedY);
    isWithinCoordinates(computedX, computedY, name);
  };

  const className = isVisible ? "names-wrapper visible" : "names-wrapper";
  return isVisible ? (
    <div className={className} style={{ top: y + 10, left: x + 40 }}>
      <div onClick={(e) => handleClick(e, "waldo")} className="char">
        <div className="icon-container">
          <img src={WaldoIcon} alt="waldo-icon" />
        </div>
        <p>Waldo</p>
      </div>
      <div onClick={(e) => handleClick(e, "wizard")} className="char">
        <div className="icon-container">
          <img src={WizardIcon} alt="wizard-icon" />
        </div>

        <p>Wizard</p>
      </div>
      <div onClick={(e) => handleClick(e, "odlaw")} className="char">
        <div className="icon-container">
          <img src={OdlawIcon} alt="odlaw-icon" />
        </div>
        <p>Odlaw</p>{" "}
      </div>
    </div>
  ) : null;
}
