import React, { useEffect, useState } from "react";
import "./Main.styled.scss";
import waldo from "../assets/img/main.jpg";
import NamesPopup from "./NamesPopup";

// TODO Lazy Load the image
// const Body = lazy(() => {
//   return (
//     <>
//       {import("./components/Header")}
//       {import("./components/Main")}
//     </>
//   );
// });

export default function Main({ handleComplete, imgURL }) {
  const [values, setValues] = useState({});
  const [displayPopup, setDisplayPopup] = useState(false);

  const handleClick = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const [x, y] = [e.clientX - left, e.clientY - top];
    const computedX = width / (e.clientX - left);
    const computedY = height / (e.clientY - top);
    setValues({ x, y, computedX, computedY });
    setDisplayPopup(true);
  };

  // * Delete later
  const calculateAcceptable = () => {
    if (!Object.keys(values).length) return "No Data yet";
    const { computedX, computedY } = values;
    // checkCoordinates
    return `Position X:${computedX} Position Y: ${computedY}`;
  };

  // useEffect(() => {
  //   handleComplete();
  // }, []);

  return (
    <main>
      <p>{calculateAcceptable()}</p>
      <section className="img-container">
        <img
          src={imgURL}
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
