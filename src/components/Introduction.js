import React, { useState } from "react";
import Modal from "./Modal";

// TODO Starts with loading the image in the background
// TODO Immediately load the modal
// TODO show the characters (fetch from db)

export default function Introduction() {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    //closes the modal
    // redirect to the game
    setShow(false);
  };
  return (
    <>
      <Modal show={show}>
        <div>Intro</div>
        <p>Add modal first</p>
        <button onClick={handleClick}>Lets Start</button>
      </Modal>
    </>
  );
}
