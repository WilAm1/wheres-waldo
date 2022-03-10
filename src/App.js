import React from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Introduction from "./components/Introduction";
import Header from "./components/Header";
import Main from "./components/Main";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <BRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Introduction />
              <Header />
              <Main />
            </>
          }
        ></Route>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BRouter>
  );
}

export default App;
