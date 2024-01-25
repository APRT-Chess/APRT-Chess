import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PieceColor } from "../types/global";
import { socket } from "../utils/socket/socket";
import { v1 as uuidv1 } from "uuid";
import { useBoard } from "../contexts/BoardContext";

interface props {
  currentPlayerColor: PieceColor;
  setCurrentPlayerColor: React.Dispatch<React.SetStateAction<PieceColor>>;
  playerEmail: string;
  setPlayerEmail: React.Dispatch<React.SetStateAction<string>>;
  setHostID: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Dashboard = ({
  currentPlayerColor,
  setCurrentPlayerColor,
  playerEmail,
  setPlayerEmail,
  setHostID,
}: props) => {
  const { roomID, setRoomID, firebaseID, setFirebaseID } = useBoard();
  const [hasOpponentJoined, setHasOpponentJoined] = useState<boolean>(false);

  const navigate = useNavigate();

  const roomIDInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fbID = localStorage.getItem("firebase_id");
    const email = localStorage.getItem("email");
    console.log("email fetched:", email, fbID);

    if (!email || fbID === null) {
      navigate("/login");
    } else {
      if (email) setPlayerEmail(email); //to satisfy typescript
      setFirebaseID(fbID);
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
    // roomID is same as host's uuid
    const newRoomID = uuidv1();
    console.log("new room id:", newRoomID);
    socket.emit("create-game", { firebaseID, playerEmail, newRoomID });

    socket.on("create-success", (roomID: string) => {
      console.log("roomID:", roomID);
      setRoomID(roomID);
      //store this in local storage, so we can query it in redis on rejoin request
      localStorage.setItem("current-game-room-id", roomID);
      setHostID(roomID);
    });

    socket.on("join-success", () => {
      console.log("joined room successfully");
      setHasOpponentJoined(true);
    });
  }

  function joinGame() {
    let inputRoomID = roomIDInput.current?.value;
    console.log("entered room id:", inputRoomID);

    socket.emit("join-game", { firebaseID, playerEmail, inputRoomID });

    socket.on("join-success", () => {
      console.log("joined room successfully");
      setHasOpponentJoined(true);
      setHostID(inputRoomID);
      if (inputRoomID) {
        setRoomID(inputRoomID);

        //store this in local storage, so we can query it in redis on rejoin request
        localStorage.setItem("current-game-room-id", inputRoomID);
      }
    });
    socket.on("recieve-host-color", (hostColor: PieceColor) => {
      console.log("host color is:", hostColor);
      hostColor === "w"
        ? setCurrentPlayerColor("b")
        : setCurrentPlayerColor("w");
    });
  }
  function copyToClipboard() {
    if (roomID) {
      navigator.clipboard.writeText(roomID);
    }
  }

  function rejoinHandler() {
    const prevRoomID = localStorage.getItem("current-game-room-id");
    console.log("emitting rejoin request for last room having ID:", prevRoomID);
    socket.emit("rejoin-request", { firebaseID, prevRoomID, playerEmail });

    socket.on("rejoin-success", (currPlayerColor: PieceColor) => {
      console.log("rejoin successful");
      console.log("current player's color:", currPlayerColor);
      setCurrentPlayerColor(currPlayerColor);
      setHasOpponentJoined(true);
    });
  }

  function emitPieceColor(hostPieceColor: PieceColor) {
    setCurrentPlayerColor(hostPieceColor);
    socket.emit("host-piece-color", { hostPieceColor, roomID });
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Websockets Chess</h1>
      <h2 className=" absolute right-3 top-1 font-bold">{playerEmail}</h2>
      <button
        className=" absolute right-3 top-7 bg-yellow-500 p-2 text-white"
        onClick={rejoinHandler}
      >
        Rejoin Prev Game
      </button>
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
