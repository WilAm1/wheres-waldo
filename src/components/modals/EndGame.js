import { getDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../contexts/UserContext";

export default function EndGame({ isFinished }) {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [time, setTime] = useState();
  const { timeRef } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchDate = async () => {
    const res = await getDoc(timeRef);
    const data = res.data();
    return data;
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleTime = async () => {
    const { timeStarted, timeEnded } = await fetchDate();
    const timePlaying = (timeEnded.toMillis() - timeStarted.toMillis()) / 1000;
    setTime(`${timePlaying}`);
    updateDoc(timeRef, { span: timePlaying });
  };

  const handleDBName = async () => {
    updateDoc(timeRef, { userName: name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleDBName();
    setShow(false);
    navigate("/leaderboard");
  };

  useEffect(() => {
    if (isFinished) {
      handleTime();
      setShow(true);
    }
  }, [isFinished]);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h4>Congrats!</h4>
      </div>
      <div className="modal-body end-game">
        <p className="time-finished">
          {time
            ? `Finished in ${time} seconds! `
            : "Calculating time finished..."}
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={handleChange} />
          <button type="submit" disabled={!name}>
            Add Name and check Leaderboard
          </button>
        </form>
      </div>
    </Modal>
  );
}
