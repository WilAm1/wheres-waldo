import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Introduction from "./components/Introduction";
import Main from "./components/Main";
import Header from "./components/Header";
import "./components/general.styled.scss";
import { CheckCoordContext } from "./components/CheckCoordContext";
import { db } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";

const imgURL =
  " https://firebasestorage.googleapis.com/v0/b/wheres-waldo-3d4dc.appspot.com/o/main.jpg?alt=media&token=bf36ef96-575c-4f72-84b2-dd122c38fc6d";
function App() {
  const [isImgLoading, setIsImgLoading] = useState(true);

  const isWithinCoordinates = async (x, y, name) => {
    // TODO get the checking part in the database later!
    // TODO Fetch location of name

    const charCoords = {
      waldo: { x: [1.22, 1.26], y: [9, 13] },
      wizard: { x: [2.2, 2.3], y: [12.5, 1000] },
      odlaw: { x: [16, 26], y: [1.25, 1.35] },
    };
    const charDocRef = doc(db, "characters", name);
    const data = await getDoc(charDocRef);
    console.log(data.data());
    const isWithinX = Boolean(x >= 1.22 && x <= 1.26);
    const isWithinY = Boolean(y >= 9 && y <= 13);
    return isWithinX && isWithinY;
  };

  const handleCompleteFetch = () => {
    setIsImgLoading(false);
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
                <Introduction isDisabled={isImgLoading} />
                <Header />
                <CheckCoordContext.Provider value={{ isWithinCoordinates }}>
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
