import React, { createContext, useContext, useState, ReactNode } from "react";
import { Piece } from "../types/global";
import { socket } from "../utils/socket/socket";

interface BoardContextProps {
  boardState: Piece[][];
  setBoardState: React.Dispatch<React.SetStateAction<Piece[][]>>;
  isConnected:boolean;
  setIsConnected:React.Dispatch<React.SetStateAction<boolean>>
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [boardState, setBoardState] = useState<Piece[][]>([]);
  const [isConnected,setIsConnected] = useState(socket.connected);

  const contextValue: BoardContextProps = {
    boardState,
    setBoardState,
    isConnected,setIsConnected
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
