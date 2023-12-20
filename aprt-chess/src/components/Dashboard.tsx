import Peer, { BufferedConnection, DataConnection } from "peerjs";
import { useEffect, useState } from "react";

const Dashboard = () => {
  let [myPeer, setMyPeer] = useState<Peer>(new Peer());
  let [myID, setMyID] = useState<string>("");
  let [reciverID, setReciverID] = useState<string>("");

  useEffect(() => {
    myPeer.on("open", function (id) {
      console.log("My peer ID is: " + id);
    });

    myPeer.on("connection", (conn) => {
      console.log("connection successful");
      conn.on("data", (data) => {
        console.log("recieved", data);
      });
    });
  }, []);

  function joinRoom() {
    let connection: DataConnection = myPeer.connect(reciverID);
    if (!connection) {
      console.log("connection could not be established");
      return;
    }
    connection.on("open", () => {
      connection.send("helloooo");
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
          <div>{myID}</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mx-auto block"
            onClick={copyToClipboard}
          >
            Copy Code
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
