import React, { useState } from "react";
import Modal from "./Modal";

// TODO Starts with loading the image in the background
// TODO Immediately load the modal
// TODO show the characters (fetch from db)

export default function Introduction({ isDisabled, handleOpen }) {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(false);
    handleOpen();
  };
  return (
    <>
      <Modal show={show}>
        <div className="modal-header">Where's Waldo</div>
        <div className="modal-body">
          <p>Show off the characters to memorize</p>
          <button onClick={handleClick} disabled={isDisabled}>
            {isDisabled ? "Loading Image" : "Let's Start"}
          </button>
        </div>
      </Modal>
    </>
  );
}
