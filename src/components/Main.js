import React, { useState } from "react";
import "./Main-style.scss";
import NamesPopup from "./modals/NamesPopup";

export default function Main({ handleComplete, imgURL, isTimerRunning }) {
  const [values, setValues] = useState({});
  const [displayPopup, setDisplayPopup] = useState(false);

  const handleClick = (e) => {
    if (!isTimerRunning) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const [x, y] = [e.clientX - left, e.clientY - top];
    const computedX = width / (e.clientX - left);
    const computedY = height / (e.clientY - top);
    setValues({ x, y, computedX, computedY });
    setDisplayPopup(true);
  };

  return (
    <main>
      <section className="img-container">
        <img
          src={imgURL}
          // src={waldo}
          alt="waldo-pic"
          onClick={handleClick}
          onLoad={handleComplete}
        />
        <NamesPopup
          position={values}
          display={displayPopup}
          handleRemove={setDisplayPopup}
        />
      </section>
    </main>
  );
}
