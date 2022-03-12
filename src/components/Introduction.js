import React, { useState } from "react";
import Modal from "./Modal";

// TODO Starts with loading the image in the background
// TODO Immediately load the modal
// TODO show the characters (fetch from db)

<<<<<<< HEAD
export default function Introduction() {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    //closes the modal
    // redirect to the game
=======
export default function Introduction({ isDisabled }) {
  const [show, setShow] = useState(true);
  const handleClick = () => {
>>>>>>> display
    setShow(false);
  };
  return (
    <>
      <Modal show={show}>
<<<<<<< HEAD
        <div>Intro</div>
        <p>Add modal first</p>
        <button onClick={handleClick}>Lets Start</button>
=======
        <div className="modal-header">Where's Waldo</div>
        <div className="modal-body">
          <p>Show off the characters to memorize</p>
          <button onClick={handleClick} disabled={isDisabled}>
            {isDisabled ? "Loading Image" : "Let's Start"}
          </button>
        </div>
>>>>>>> display
      </Modal>
    </>
  );
}
