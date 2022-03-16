import React, { useEffect, useState } from "react";
// false
// set to true
// start the interval
//
export default function Timer({ toggle }) {
  const [time, setTime] = useState(0);
  const tick = () => {
    setTime((state) => state + 1);
  };
  useEffect(() => {
    if (toggle) {
      // start the interval
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }
  }, [toggle]);

  return (
    <div>
      <p>Timer {time} seconds passed</p>
    </div>
  );
}
