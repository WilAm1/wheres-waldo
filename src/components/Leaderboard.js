import { getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { queryTopScores } from "../firebase.config";
import "./Leaderboard-style.scss";
const TopScores = ({ users, currUserID }) => {
  return (
    <ol className="ordered-list leaderboard leaderboard-users">
      {users.map(({ userName, id, span }) => {
        // Check if userName is equal to current user. highlight if true
        const classNames =
          currUserID === id
            ? "leaderboard leaderboard-top-users current-user"
            : "leaderboard leaderboard-top-users ";

        return (
          <li key={id} className={classNames}>
            <span className="User-name">{userName}</span>
            <p className="User-time">{span} seconds</p>
          </li>
        );
      })}
    </ol>
  );
};

export default function Leaderboard({ isFinished }) {
  const { timeRef } = useContext(UserContext);
  const [userData, setUserData] = useState({ userName: "", span: "" });
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const fetchUserScore = async () => {
      const res = await getDoc(timeRef);
      const { span, userName } = res.data();
      console.log(span);
      setUserData({ span, userName, id: res.id });
    };

    const fetchTopUsers = async () => {
      console.log("iran");
      const allUserDocs = await getDocs(queryTopScores);
      const usersArray = allUserDocs.docs.map((doc) => {
        const id = doc.id;
        const { userName, span } = doc.data();
        return { userName, span, id };
      });
      console.log(usersArray);
      setTopScores(usersArray);
    };

    if (isFinished) {
      fetchUserScore();
      fetchTopUsers();
    }
  }, [isFinished]);

  if (isFinished) {
    const { userName, span, id } = userData;
    return (
      <div>
        <header className="heading">
          <h1>Leaderboard</h1>
        </header>
        <section className="leaderboard-section">
          <div className="leaderboard leaderboard-user">
            <div className="User-name"> {userName} </div>
            <div className="User-time"> {span} seconds </div>
          </div>
          <TopScores users={topScores} currUserID={id} />
        </section>
      </div>
    );
  } else {
    return <div>Not yet finished</div>;
  }
}
