import "./assets/App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import Login from "./components/Login";
import { Peer } from "peerjs";
import { PieceColor } from "./types/global";
import { BoardProvider } from "./contexts/BoardContext";

function App() {
  let [myPeer, setMyPeer] = useState<Peer>(
    new Peer({
      config: {
        iceServers: [
          { url: "stun:stun1.l.google.com:19302" },
          { url: "stun:stun2.l.google.com:19302" },
          { url: "stun:stun1.l.google.com:19302" },
        ],
      },
    })
  );
  let [reciverID, setReciverID] = useState<string>("");
  let [isCaller, setIsCaller] = useState<boolean>(false);
  const [currentPlayerColor, setCurrentPlayerColor] = useState<PieceColor>("");

  return (
    <BoardProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                myPeer={myPeer}
                reciverID={reciverID}
                setReciverID={setReciverID}
                isCaller={isCaller}
                setIsCaller={setIsCaller}
                currentPlayerColor={currentPlayerColor}
                setCurrentPlayerColor={setCurrentPlayerColor}
              />
            }
          ></Route>

          <Route path="/login" element={<Login />} />
          
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
