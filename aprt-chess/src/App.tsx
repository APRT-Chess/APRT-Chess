import "./assets/App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import Login from "./components/Login";
import { PieceColor } from "./types/global";
import { BoardProvider } from "./contexts/BoardContext";

function App() {
  const [currentPlayerColor, setCurrentPlayerColor] = useState<PieceColor>("");
  const [playerEmail, setPlayerEmail] = useState<string>("");
  const [hostID, sethostID] = useState<string | undefined>("");

  return (
    <BoardProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                currentPlayerColor={currentPlayerColor}
                setCurrentPlayerColor={setCurrentPlayerColor}
                playerEmail={playerEmail}
                setPlayerEmail={setPlayerEmail}
                setHostID={sethostID}
              />
            }
          ></Route>

          <Route
            path="/login"
            element={
              <Login
                playerEmail={playerEmail}
                setPlayerEmail={setPlayerEmail}
              />
            }
          />

          <Route
            path="/board"
            element={
              <Board currentPlayerColor={currentPlayerColor} hostID={hostID} />
            }
          />
        </Routes>
      </BrowserRouter>
    </BoardProvider>
  );
}

export default App;
