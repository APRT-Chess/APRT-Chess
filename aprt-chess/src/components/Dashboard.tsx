import Peer, { DataConnection } from "peerjs";
import { useEffect, useState, useRef, LegacyRef, InputHTMLAttributes, DetailedHTMLProps } from "react";
import { useNavigate } from "react-router-dom";
import { PieceColor } from "../types/global";
import { socket } from "../utils/socket/socket";

interface props {
  myPeer: Peer;
  reciverID: string;
  setReciverID: React.Dispatch<React.SetStateAction<string>>;
  isCaller: boolean;
  setIsCaller: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayerColor: PieceColor;
  setCurrentPlayerColor: React.Dispatch<React.SetStateAction<PieceColor>>;
}

const Dashboard = ({
  currentPlayerColor,
  setCurrentPlayerColor,
}: props) => {
  const [roomID,setRoomID] = useState<string>("");
  const [hasOpponentJoined,setHasOpponentJoined] = useState<boolean>(false);
  const [playerEmail,setPlayerEmail] = useState<string>();
  
  const navigate = useNavigate();

  const currentPlayerColorRef = useRef(currentPlayerColor);
  const roomIDInput = useRef<HTMLInputElement>(null);

  useEffect(()=>{
      let email = localStorage.getItem("email")
      if(email)
      {
        setPlayerEmail(email);
        console.log("logged in with mail:",email)
      }
      else{
        navigate('/login');
      }
  },[playerEmail])

  useEffect(() => {
    currentPlayerColorRef.current = currentPlayerColor;
  }, [currentPlayerColor]);

  // useEffect(() => {
  //   // this part handles if player hosts the game
  //   myPeer.on("connection", (conn) => {
  //     console.log("connection successful from dashboard");
  //     conn.on("error", (error) => {
  //       console.error("Connection error:", error);
  //     });
  //     conn.on("open", () => {
  //       conn.on("data", (data) => {
  //         console.log("from caller", data);
  //       });
  //       conn.send(
  //         JSON.stringify({ currentPlayerColor: currentPlayerColorRef.current })
  //       );
  //       navigate("/board");
  //     });
  //   });
  // }, []);

  // this part handles if player joins a game
  // function joinRoom() {
  //   let connection: DataConnection = myPeer.connect(reciverID);
  //   if (!connection) {
  //     console.error("connection could not be established");
  //     return;
  //   }
  //   connection.on("open", () => {
  //     setIsCaller(true);
  //     connection.on("data", (data: any) => {
  //       console.log("from host", data);
  //       const opponentColor: PieceColor = JSON.parse(data).currentPlayerColor;
  //       setCurrentPlayerColor(opponentColor === "w" ? "b" : "w");
  //     });
  //   });
  // }

  function logoutHandler(){
    localStorage.clear();
    setPlayerEmail("");
  }

  useEffect(() => {
    if (hasOpponentJoined) {
      navigate("/board");
    }
  }, [hasOpponentJoined]);

  function createGame()
  {
    socket.emit("create-game")
    socket.on('create-success',(roomID:string)=>{
      console.log("roomID:",roomID);
      setRoomID(roomID);
    })
    socket.on("join-success",()=>{
      console.log("joined room successfully");
      setHasOpponentJoined(true);
    })
  }

  function joinGame()
  {
    let inputRoomID = roomIDInput.current?.value;
    console.log("entered room id:",inputRoomID);;
    socket.emit("join-game",inputRoomID)
    socket.on("join-success",()=>{
      console.log("joined room successfully");
      setHasOpponentJoined(true);
    })
    
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(roomID);
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Serverless Peer-to-Peer Chess</h1>
      <h2 className=" absolute right-3 top-1 font-bold">{playerEmail}</h2>
      <button className=" p-4 text-red-500 font-bold text-xl" onClick={logoutHandler}>Logout</button>
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
          {currentPlayerColor ? (
            <div>
              <div>{roomID}</div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mx-auto my-4 block"
                onClick={copyToClipboard}
              >
                Copy Code
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mx-auto my-4 block"
                onClick={() => setRoomID("")}
              >
                Back
              </button>
            </div>
          ) : (
            <div></div>
          )}
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
