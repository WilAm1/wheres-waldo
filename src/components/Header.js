import React from "react";
import OdlawBody from "../assets/img/odlaw-body.png";
import WizardBody from "../assets/img/wizard-body.png";
import WaldoBody from "../assets/img/waldo-body.png";
import "./Header.styled.scss";

export default function Header() {
  // TODO Add darkening of image background when user clicks
  return (
    <header>
      <p>Show the remaining characters here</p>
      <div className="remaining-chars">
        <div className="sprite-wrapper">
          <img src={OdlawBody} alt="-sprite" />
        </div>
        <div className="sprite-wrapper">
          <img src={WizardBody} alt="-sprite" />
        </div>
        <div className="sprite-wrapper">
          <img src={WaldoBody} alt="-sprite" />
        </div>
      </div>
      <p>Show the timer here</p>
    </header>
  );
}
