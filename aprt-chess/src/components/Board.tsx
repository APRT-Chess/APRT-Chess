/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import {
  blackBishop,
  blackKing,
  blackKnight,
  blackPawn,
  blackQueen,
  blackRook,
  whiteBishop,
  whiteKing,
  whiteKnight,
  whitePawn,
  whiteQueen,
  whiteRook,
} from "../utils/ChessPieces";
import Piece from "./Piece";
import { validate } from "../utils/validate";

type Piece = string;

const Board = () => {

  const [boardState,setBoardState] = useState< Piece[][]>([]);

  function setBoard() {
    const pieces:Piece[][] = [
      [blackRook,blackKnight,blackBishop,blackQueen,blackKing,blackBishop,blackKnight,blackRook],
      [blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      [whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn],
      [whiteRook,whiteKnight,whiteBishop,whiteKing,whiteQueen,whiteBishop,whiteKnight,whiteRook],
    ];
    setBoardState(pieces)
  }
  
  useEffect(()=>{
    setBoard();
  },[])

  function isValidMove(fromX: number, fromY: number, toX: number, toY: number,pieceName:string) {

    return validate(fromX,fromY,toX,toY,pieceName);
  }

  function onDropHandler(
    e: React.DragEvent<HTMLDivElement>,
    toX: number,
    toY: number
  ) {
    e.preventDefault();
   

    
    
    const initialCoords = e.dataTransfer.getData("text/plain");
    let [fromX, fromY,pieceName] = initialCoords.split("-").map((item):number|string=>item);
    fromX = +fromX;
    fromY = +fromY;

    const piece = pieceName.toString()
    console.log("from", fromX, fromY);
    console.log("piece:",piece);
    console.log("to", toX, toY);


    if (isValidMove(fromX, fromY, toX, toY,piece)) {
      const updatedBoard: Piece[][] = [...boardState];
      updatedBoard[toX][toY] = updatedBoard[fromX][fromY];
      updatedBoard[fromX][fromY] = "";
      setBoardState(updatedBoard);
    }
  }

  const board = [];

  let image = undefined;

  for (let row = 0; row < boardState.length; row++) {
    for (let col = 0; col < boardState[0].length; col++) {
      const color = col + row;
      image = boardState[row][col];
      board.push(
        <div
          className={`inline-flex w-28 h-28 items-center justify-center select-none 
              x-coordinate-${row} y-coordinate-${col}  
              ${color % 2 === 0 ? "bg-slate-700" : "bg-gray-400"}`}
          onDrop={(e) => onDropHandler(e, row, col)}
          onDragOver={(e) => e.preventDefault()}
        >
          {image && (
            <Piece image={image} x_coordinate={row} y_coordinate={col}></Piece>
          )}
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex justify-center">

      <div className="grid grid-cols-8 grid-rows-8 gap-0 max-w-4xl">
        {board}
      </div>
      </div>
    </>
  );
};

export default Board;
