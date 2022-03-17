import React, { useEffect, useState } from "react";

export default function Timer({ toggle }) {
  const [time, setTime] = useState(0);
  const tick = () => {
    setTime((state) => state + 1);
  };
  useEffect(() => {
    if (toggle) {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }
  }, [toggle]);

  return (
    <div className="timer-wrapper">
      <p>
        {" "}
        {parseInt(time / 60)} : {time % 60}{" "}
      </p>
    </div>
  );
}
