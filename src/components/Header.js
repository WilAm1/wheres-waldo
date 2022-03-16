import React from "react";
import OdlawBody from "../assets/img/odlaw-body.png";
import WizardBody from "../assets/img/wizard-body.png";
import WaldoBody from "../assets/img/waldo-body.png";
import "./Header.styled.scss";
import Timer from "./Timer";

export default function Header({ characters, isTimerRunning }) {
  const isCharacterClicked = (name) => {
    return characters.indexOf(name) === -1
      ? "sprite-wrapper not-clicked"
      : "sprite-wrapper clicked";
  };

  return (
    <header>
      <p>Show the remaining characters here</p>
      <Timer toggle={isTimerRunning} />
      <div className="remaining-chars">
        <div className={isCharacterClicked("odlaw")}>
          <img src={OdlawBody} alt="character-sprite" />
          <p>Odlaw</p>
        </div>
        <div className={isCharacterClicked("wizard")}>
          <img src={WizardBody} alt="character-sprite" />
          <p>Wizard</p>
        </div>
        <div className={isCharacterClicked("waldo")}>
          <img src={WaldoBody} alt="character-sprite" />
          <p>Waldo</p>
        </div>
      </div>
      <p>Show the timer here</p>
    </header>
  );
}
