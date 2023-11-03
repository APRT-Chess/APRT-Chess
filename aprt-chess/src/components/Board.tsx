/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState, DragEvent } from "react";
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

  // function to set initial board state
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
  
  useEffect(() => {
    setBoard();
  }, []);

  // function to check if move is valid as per game rules
  function isValidMove(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    pieceName: string
  ) {
    return validate(fromX, fromY, toX, toY, pieceName, boardState);
  }

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
    if (isValidMove(fromX, fromY, toX, toY, piece)) {
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
