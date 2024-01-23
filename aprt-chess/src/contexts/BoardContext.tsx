import React, { createContext, useContext, useState, ReactNode } from "react";
import { Piece } from "../types/global";
import { socket } from "../utils/socket/socket";

interface BoardContextProps {
  boardState: Piece[][];
  setBoardState: React.Dispatch<React.SetStateAction<Piece[][]>>;
  isConnected:boolean;
  setIsConnected:React.Dispatch<React.SetStateAction<boolean>>
  roomID:string|undefined;
  setRoomID:React.Dispatch<React.SetStateAction<string>>
  playerEmail:string;
  setPlayerEmail:React.Dispatch<React.SetStateAction<string>>
  firebaseID:string;
  setFirebaseID:React.Dispatch<React.SetStateAction<string>>
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [boardState, setBoardState] = useState<Piece[][]>([]);
  const [isConnected,setIsConnected] = useState(socket.connected);
  const [roomID,setRoomID] = useState<string>("");
  const [playerEmail,setPlayerEmail] = useState<string>("");
  const [firebaseID, setFirebaseID] = useState<string>("");


  const contextValue: BoardContextProps = {
    boardState,
    setBoardState,
    isConnected,setIsConnected,
    roomID,setRoomID,
    playerEmail,setPlayerEmail,firebaseID,setFirebaseID
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = (): BoardContextProps => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }

  return context;
};
