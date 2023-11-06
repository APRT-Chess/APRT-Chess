/* eslint-disable @typescript-eslint/no-unused-vars */
// apoorva: pawn king queen
// rajeev: rook bishop knight

import { isPathClear } from "./pathClear";
import { validateRookMove } from "./pieceValidation/rook";

export type PieceColor = "w" | "b";

// all utility function go here

// return true if a tile is occupied
function isOccupied(x: number, y: number, boardState: string[][]): boolean {
  if (boardState[y][x]) 
    return true;
  else 
    return false;
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
      // console.log("its a white pawn");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"w");

      case "wK":
      // console.log("its a white king");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"w");

      case "wQ":
      // console.log("its a white queen");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"w");

    case "wN":
      // console.log("its a white knight");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"w");

    case "wR":
      return validateRookMove(fromX, fromY, toX, toY, boardState, "w");

    case "wB":
      // console.log("its a white bishop");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"w");

    case "bP":
      // console.log("its a black pawn");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"b");

    case "bK":
      // console.log("its a black king");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"b");

    case "bQ":
      // console.log("its a black queen");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"b");

    case "bN":
      // console.log("its a black knight");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"b");

    case "bR":
      // console.log("its a black rook");
      return validateRookMove(fromX, fromY, toX, toY, boardState, "b");
    case "bB":
      // console.log("its a black bishop");
      return validateRandomMove(fromX,fromY,toX,toY,boardState,"b");


    default:
      break;
  }

  return true;
}

// all move validation function go here
// naming convention `validate${PieceName}Move`

function validateRandomMove(fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: string[][],
  pieceColor: PieceColor):boolean{

    if (isPathClear(fromX, fromY, toX, toY, boardState)) {
      console.log("path is clear");
      return true;
    } 
    else 
      return false;
  }

