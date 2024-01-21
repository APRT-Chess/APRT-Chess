import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PieceColor } from "../types/global";
import { socket } from "../utils/socket/socket";

interface props {
  currentPlayerColor: PieceColor;
  setCurrentPlayerColor: React.Dispatch<React.SetStateAction<PieceColor>>;
  playerEmail: string;
  setPlayerEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Dashboard = ({
  currentPlayerColor,
  setCurrentPlayerColor,
  playerEmail,
  setPlayerEmail,
}: props) => {
  const [roomID, setRoomID] = useState<string>("");
  const [hasOpponentJoined, setHasOpponentJoined] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string | null>("");

  const navigate = useNavigate();

  const roomIDInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const uid = localStorage.getItem("uuid");
    if (!playerEmail || uid === null) {
      navigate("/login");
    } else {
      setUuid(uid);
    }
  });

  function logoutHandler() {
    sessionStorage.clear();
    setPlayerEmail("");
  }

  useEffect(() => {
    if (hasOpponentJoined) {
      navigate("/board");
    }
  }, [hasOpponentJoined]);

  function createGame() {
    socket.emit("create-game", { playerEmail });

    socket.on("create-success", (roomID: string) => {
      console.log("roomID:", roomID);
      setRoomID(roomID);
    });

    socket.on("join-success", () => {
      console.log("joined room successfully");
      setHasOpponentJoined(true);
    });
  }

  function joinGame() {
    let inputRoomID = roomIDInput.current?.value;
    console.log("entered room id:", inputRoomID);

    socket.emit("join-game", { playerEmail, inputRoomID });

    socket.on("join-success", () => {
      console.log("joined room successfully");
      setHasOpponentJoined(true);
    });
    socket.on("recieve-host-color", (hostColor: PieceColor) => {
      hostColor === "w"
        ? setCurrentPlayerColor("b")
        : setCurrentPlayerColor("w");
    });
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(roomID);
  }

  function emitPieceColor(color: PieceColor) {
    setCurrentPlayerColor(color);
    socket.emit("host-piece-color", color);
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Serverless Peer-to-Peer Chess</h1>
      <h2 className=" absolute right-3 top-1 font-bold">{playerEmail}</h2>
      <h2 className=" absolute right-3 top-9 font-bold">{uuid}</h2>
      <button
        className=" p-4 text-red-500 font-bold text-xl"
        onClick={logoutHandler}
      >
        Logout
      </button>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mx-auto block"
          onClick={createGame}
        >
          Create a game
        </button>
      </div>
      {roomID ? (
        <div>
          <div className="mb-4">
            <button
              className={`${
                currentPlayerColor === "w" ? "bg-blue-500" : "bg-gray-300"
              } text-white px-4 py-2 rounded mx-auto inline mr-2`}
              onClick={() => emitPieceColor("w")}
            >
              White
            </button>

            <button
              className={`${
                currentPlayerColor === "b" ? "bg-black" : "bg-gray-300"
              } text-white px-4 py-2 rounded mx-auto inline`}
              onClick={() => emitPieceColor("b")}
            >
              Black
            </button>
          </div>
          {currentPlayerColor ? (
            <div>
              <div>{roomID}</div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mx-auto my-4 block"
                onClick={copyToClipboard}
              >
                Copy Code
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mx-auto my-4 block"
            onClick={() => setRoomID("")}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="mb-2">Enter a code to join a game</div>
          <input
            className="border border-gray-300 px-4 py-2 rounded"
            ref={roomIDInput}
            placeholder="code goes here"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={joinGame}
          >
            Join Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
