/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState, DragEvent } from "react";
import Piece from "./Piece";
import { PieceColor } from "../types/global";
import { validate } from "../utils/validate";
import { setBoardForWhite, setBoardForBlack } from "../utils/setInitialBoard";
import Peer, { DataConnection } from "peerjs";

type Piece = string;

interface props {
  myPeer: Peer;
  reciverID: string;
  isCaller: boolean;
}

const Board = ({ myPeer, reciverID, isCaller }: props) => {
  const [boardState, setBoardState] = useState<Piece[][]>([]);
  const [currentPlayerColor, setCurrentPlayerColor] = useState<PieceColor>("b");

  useEffect(() => {
    // listen for incoming data from caller
    myPeer.on("connection", (conn) => {
      console.log("connection successful");
      conn.on("data", (data) => {
        console.log("recieved", data);
      });
    });

    // if is caller is true send connection request to other peer
    if (isCaller) {
      let connection: DataConnection = myPeer.connect(reciverID);
      if (!connection) {
        console.log("connection could not be established");
        return;
      }
      connection.on("open", () => {
        connection.send("starting game");
      });
    }
  }, [myPeer, reciverID]);

  useEffect(() => {
    currentPlayerColor === "w"
      ? setBoardForWhite(setBoardState)
      : setBoardForBlack(setBoardState);
  }, []);

  function onDropHandler(
    e: DragEvent<HTMLDivElement>,
    toX: number,
    toY: number
  ) {
    e.preventDefault();

    // extract initial position and piece name
    const initialCoords = e.dataTransfer.getData("text/plain");
    // eslint-disable-next-line prefer-const
    let [fromX, fromY, pieceName] = initialCoords
      .split("-")
      .map((item): number | string => item);
    fromX = +fromX;
    fromY = +fromY;

    const piece = pieceName.toString();
    console.log("from", fromX, fromY);
    // console.log("piece:", piece);
    console.log("to", toX, toY);

    // if move is valid update the board state
    if (
      validate(fromX, fromY, toX, toY, piece, currentPlayerColor, boardState)
    ) {
      const updatedBoard: Piece[][] = [...boardState];
      updatedBoard[toY][toX] = updatedBoard[fromY][fromX];
      updatedBoard[fromY][fromX] = "";
      setBoardState(updatedBoard);
    }
  }

  const boardJSX = [];

  let image = undefined;
  // pushes the JSX for chessboard to board array
  for (let row = 0; row < boardState.length; row++) {
    for (let col = 0; col < boardState[0].length; col++) {
      // if i+j is even box is dark
      // else it is light
      const color = col + row;
      image = boardState[row][col];
      boardJSX.push(
        <div
          key={`${col}-${row}`}
          className={`inline-flex w-28 h-28 items-center justify-center select-none 
              x-coordinate-${col} y-coordinate-${row}  
              ${color % 2 === 0 ? "bg-slate-700" : "bg-gray-400"}`}
          onDrop={(e) => onDropHandler(e, col, row)}
          onDragOver={(e) => e.preventDefault()}
        >
          {image && (
            <Piece image={image} x_coordinate={col} y_coordinate={row}></Piece>
          )}
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-8 grid-rows-8 gap-0 max-w-4xl">
          {boardJSX}
        </div>
      </div>
    </>
  );
};

export default Board;
