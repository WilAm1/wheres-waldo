import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Introduction from "./components/modals/Introduction";
import Main from "./components/Main";
import Header from "./components/Header";
import "./components/general-style.scss";
import { CheckCoordContext } from "./components/contexts/CheckCoordContext";
import { UserContext } from "./components/contexts/UserContext";
import EndGame from "./components/modals/EndGame";
import { imgURL } from "./imgSource";
import { db } from "./firebase.config";
import {
  doc,
  getDoc,
  collection,
  serverTimestamp,
  updateDoc,
  setDoc,
} from "firebase/firestore";

function App() {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [finishedCharacters, setFinishedCharacters] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const timeRef = useRef(null);

  // * Firebase Functions must have CC in order to use it so validating on front end as an alternative.
  const checkCoordinates = async (x, y, name) => {
    const charDocRef = doc(db, "characters", name);
    const res = await getDoc(charDocRef);
    const {
      x: [minX, maxX],
      y: [minY, maxY],
    } = res.data();
    const isWithinX = Boolean(x >= minX && x <= maxX);
    const isWithinY = Boolean(y >= minY && y <= maxY);

    console.log(isWithinX && isWithinY);
    return isWithinX && isWithinY;
  };

  const handleFinishTime = async () => {
    await updateDoc(timeRef.current, {
      timeEnded: serverTimestamp(),
    });
    setIsTimerRunning(false);
    setIsFinished(true);
  };

  const handleCharClick = async (x, y, name) => {
    if (finishedCharacters.indexOf(name) > -1) return;
    const isClickCorrect = await checkCoordinates(x, y, name);
    if (isClickCorrect) {
      setFinishedCharacters((state) => [...state, name]);
    }
  };

  useEffect(() => {
    // TODO  refactor later
    if (finishedCharacters.length === 3) {
      console.log("Finished All Characters!");
      handleFinishTime();
    }
  }, [finishedCharacters]);

  const handleOpen = async () => {
    if (!isImgLoading && !isFinished) {
      await startCounting();
      setIsTimerRunning(true);
      console.log("I started counting!");
    }
  };

  const handleCompleteFetch = () => {
    setIsImgLoading(false);
  };

  const startCounting = async () => {
    const ref = doc(collection(db, "users"));
    await setDoc(ref, {
      timeStarted: serverTimestamp(),
    });
    timeRef.current = ref;
    console.log("i started counting on the server!", ref);
  };

  const Leaderboard = lazy(() => import("./components/Leaderboard"));

  return (
    <BRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Introduction
                  isDisabled={isImgLoading}
                  handleOpen={handleOpen}
                />
                <Header
                  characters={finishedCharacters}
                  isTimerRunning={isTimerRunning}
                />
                <CheckCoordContext.Provider value={{ handleCharClick }}>
                  <Main
                    handleComplete={handleCompleteFetch}
                    imgURL={imgURL}
                    isTimerRunning={isTimerRunning}
                  />
                </CheckCoordContext.Provider>
                <UserContext.Provider value={{ timeRef: timeRef.current }}>
                  <EndGame isFinished={isFinished} />
                </UserContext.Provider>
              </>
            }
          ></Route>
          <Route
            path="/leaderboard"
            element={
              <UserContext.Provider value={{ timeRef: timeRef.current }}>
                <Leaderboard isFinished={isFinished} />
              </UserContext.Provider>
            }
          />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </BRouter>
  );
}

export default App;
