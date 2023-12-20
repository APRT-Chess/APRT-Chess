import { useState } from "react";

const Dashboard = () => {
  let [peerID, setPeerID] = useState<string>("");

  function createRoom() {}
  function joinRoom() {}

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Serverless Peer-to-Peer Chess</h1>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mx-auto block"
          onClick={createRoom}
        >
          Create a game
        </button>
      </div>

      <div className="mb-4">
        <div className="mb-2">Enter a code to join a game</div>
        <input
          className="border border-gray-300 px-4 py-2 rounded"
          onChange={(e) => setPeerID(e.target.value)}
          placeholder="code goes here"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
          onClick={joinRoom}
        >
          Join Game
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
