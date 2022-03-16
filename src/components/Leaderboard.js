import { getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { queryTop10 } from "../firebase.config";

const TopScores = ({ users }) => {
  return (
    <ol>
      {users.map(({ userName, id, span }) => {
        return (
          <li key={id}>
            <p>User Name: {userName}</p>
            <p>Time Finished: {span}</p>
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
      setUserData({ span, userName });
    };

    const fetchTopUsers = async () => {
      console.log("iran");
      const allUserDocs = await getDocs(queryTop10);
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
    const { userName, span } = userData;
    return (
      <div>
        <div className="heading">
          <h1>Leaderboard</h1>
        </div>
        <div class="body">
          <TopScores users={topScores} />
          <div className="User-name"> {userName} </div>
          <div className="User-span"> {span} </div>
        </div>
      </div>
    );
  } else {
    return <div>Not yet finished</div>;
  }
}
