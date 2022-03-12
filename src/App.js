import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Introduction from "./components/Introduction";
import Main from "./components/Main";
import Header from "./components/Header";
import "./components/general.styled.scss";
import { CheckCoordContext } from "./components/CheckCoordContext";
import { db } from "./firebase.config";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { imgURL } from "./imgSource";

function App() {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [finishedCharacters, setFinishedCharacters] = useState([]);

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
    if (isWithinX && isWithinY) {
      setFinishedCharacters(name);
    }
    // return isWithinX && isWithinY;
  };
  useEffect(() => {
    if (finishedCharacters.length === 3) {
      // show endgame
    }
  }, [finishedCharacters]);
  const handleOpen = () => {
    setIsStarted(true);
  };

  const handleCompleteFetch = () => {
    setIsImgLoading(false);
  };

  const startCounting = async () => {
    const ref = await addDoc(collection(db, "users"), {
      timestamp: serverTimestamp(),
    });
    console.log("i started counting on the server!", ref);
    timeRef.current = ref;
  };

  useEffect(() => {
    if (!isImgLoading && isStarted) {
      //start the timer!
      startCounting();
    }
  }, [isStarted]);

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
                <Header characters={finishedCharacters} />
                <CheckCoordContext.Provider
                  value={{ isWithinCoordinates: checkCoordinates }}
                >
                  <Main handleComplete={handleCompleteFetch} imgURL={imgURL} />
                </CheckCoordContext.Provider>
              </>
            }
          ></Route>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </BRouter>
  );
}

export default App;
