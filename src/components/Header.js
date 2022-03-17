import React from "react";
import OdlawBody from "../assets/img/odlaw-body.png";
import WizardBody from "../assets/img/wizard-body.png";
import WaldoBody from "../assets/img/waldo-body.png";
import "./Header-style.scss";
import Timer from "./Timer";

export default function Header({ characters, isTimerRunning }) {
  const isCharacterClicked = (name) => {
    return characters.indexOf(name) === -1
      ? "sprite-wrapper not-clicked"
      : "sprite-wrapper clicked";
  };

  return (
    <header>
      <div className="header-divider">
        <div>
          <h2>Where's Waldo</h2>
          <Timer toggle={isTimerRunning} />
        </div>

        <div className="remaining-chars">
          <div className="character-wrapper">
            <div className={isCharacterClicked("odlaw")}>
              <img src={OdlawBody} alt="character-sprite" />
            </div>
            <p>Odlaw</p>
          </div>
          <div className="character-wrapper">
            <div className={isCharacterClicked("wizard")}>
              <img src={WizardBody} alt="character-sprite" />
            </div>
            <p>Wizard</p>
          </div>
          <div className="character-wrapper">
            <div className={isCharacterClicked("waldo")}>
              <img src={WaldoBody} alt="character-sprite" />
            </div>
            <p>Waldo</p>
          </div>
        </div>
      </div>
    </header>
  );
}
