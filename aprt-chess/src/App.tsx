import "./assets/App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import { Peer } from "peerjs";

function App() {
  let [myPeer, setMyPeer] = useState<Peer>(new Peer());
  let [reciverID, setReciverID] = useState<string>("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              myPeer={myPeer}
              reciverID={reciverID}
              setReciverID={setReciverID}
            />
          }
        ></Route>
        <Route
          path="/board"
          element={<Board myPeer={myPeer} reciverID={reciverID} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
