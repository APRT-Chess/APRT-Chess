import Peer, { DataConnection } from "peerjs";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PieceColor } from "../types/global";

interface props {
  myPeer: Peer;
  reciverID: string;
  setReciverID: React.Dispatch<React.SetStateAction<string>>;
  setIsCaller: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayerColor: PieceColor;
  setCurrentPlayerColor: React.Dispatch<React.SetStateAction<PieceColor>>;
}

const Dashboard = ({
  myPeer,
  reciverID,
  setReciverID,
  setIsCaller,
  currentPlayerColor,
  setCurrentPlayerColor,
}: props) => {
  let [myID, setMyID] = useState<string>("");
  const navigate = useNavigate();

  const currentPlayerColorRef = useRef(currentPlayerColor);

  useEffect(() => {
    currentPlayerColorRef.current = currentPlayerColor;
  }, [currentPlayerColor]);

  useEffect(() => {
    // this part handles if player hosts the game
    myPeer.on("connection", (conn) => {
      console.log("connection successful");
      conn.on("open", () => {
        conn.on("data", (data) => {
          console.log("from caller", data);
        });
        console.log("sending my color", currentPlayerColorRef.current);
        conn.send(
          JSON.stringify({ currentPlayerColor: currentPlayerColorRef.current })
        );
        navigate("/board");
      });
    });
  }, []);

  // this part handles if player joins a game
  function joinRoom() {
    let connection: DataConnection = myPeer.connect(reciverID);
    if (!connection) {
      console.error("connection could not be established");
      return;
    }
    connection.on("open", () => {
      setIsCaller(true);
      connection.on("data", (data) => {
        console.log("from host", data);
        const opponentColor: PieceColor = JSON.parse(data).currentPlayerColor;
        setCurrentPlayerColor(opponentColor === "w" ? "b" : "w");
      });
      connection.send("test message from caller");
      navigate("/board");
    });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(myID);
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Serverless Peer-to-Peer Chess</h1>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mx-auto block"
          onClick={() => setMyID(myPeer.id)}
        >
          Create a game
        </button>
      </div>
      {myID ? (
        <div>
          <div className="mb-4">
            <button
              className={`${
                currentPlayerColor === "w" ? "bg-blue-500" : "bg-gray-300"
              } text-white px-4 py-2 rounded mx-auto inline mr-2`}
              onClick={() => setCurrentPlayerColor("w")}
            >
              White
            </button>

            <button
              className={`${
                currentPlayerColor === "b" ? "bg-black" : "bg-gray-300"
              } text-white px-4 py-2 rounded mx-auto inline`}
              onClick={() => setCurrentPlayerColor("b")}
            >
              Black
            </button>
          </div>
          <div>{myID}</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mx-auto my-4 block"
            onClick={copyToClipboard}
          >
            Copy Code
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mx-auto my-4 block"
            onClick={() => setMyID("")}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="mb-2">Enter a code to join a game</div>
          <input
            className="border border-gray-300 px-4 py-2 rounded"
            onChange={(e) => setReciverID(e.target.value)}
            placeholder="code goes here"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={joinRoom}
          >
            Join Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
