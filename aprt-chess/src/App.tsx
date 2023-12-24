import "./assets/App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import { Peer } from "peerjs";
import { PieceColor } from "./types/global";
import { BoardProvider } from "./contexts/BoardContext";

function App() {
  let [myPeer, setMyPeer] = useState<Peer>(new Peer());
  let [reciverID, setReciverID] = useState<string>("");
  let [isCaller, setIsCaller] = useState<boolean>(false);
  const [currentPlayerColor, setCurrentPlayerColor] = useState<PieceColor>("w");

  return (
    <BoardProvider>

    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
            myPeer={myPeer}
            reciverID={reciverID}
            setReciverID={setReciverID}
            setIsCaller={setIsCaller}
            currentPlayerColor={currentPlayerColor}
              setCurrentPlayerColor={setCurrentPlayerColor}
            />
          }
          ></Route>
        <Route
          path="/board"
          element={
            <Board
            myPeer={myPeer}
            reciverID={reciverID}
              isCaller={isCaller}
              currentPlayerColor={currentPlayerColor}
            />
          }
        />
      </Routes>
    </BrowserRouter>
            </BoardProvider>
  );
}

export default App;
