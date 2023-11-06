/* eslint-disable @typescript-eslint/no-unused-vars */
// apoorva: pawn king queen
// rajeev: rook bishop knight

import { validateQueenMove } from "./pieceValidation/queen";
import { validateRookMove } from "./pieceValidation/rook";

export type PieceColor = "w" | "b";

// all utility function go here

// isOccupied returns true if a tile is occupied
function isOccupied(x: number, y: number, boardState: string[][]): boolean {
  return !!boardState[y][x];
}

// the switch case which trigges the correct validation logic
export function validate(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  pieceName: string,
  boardState: string[][]
): boolean {
  console.log("is occupied:", isOccupied(toX, toY, boardState));

  switch (pieceName) {
    case "wP":
      console.log("its a white pawn");
      break;
    case "wK":
      console.log("its a white king");
      break;
    case "wQ":
      // console.log("its a white queen");
      return validateQueenMove(fromX, fromY, toX, toY, boardState, "w");

    case "wN":
      console.log("its a white knight");
      break;
    case "wR":
      return validateRookMove(fromX, fromY, toX, toY, boardState, "w");
    case "wB":
      console.log("its a white bishop");
      break;
    case "bP":
      console.log("its a black pawn");
      break;
    case "bK":
      console.log("its a black king");
      break;
    case "bQ":
      console.log("its a black queen");
      break;
    case "bN":
      console.log("its a black knight");
      break;
    case "bR":
      return validateRookMove(fromX, fromY, toX, toY, boardState, "b");
    case "bB":
      console.log("its a black bishop");
      break;

    default:
      break;
  }

  return true;
}
