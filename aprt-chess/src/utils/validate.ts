// apoorva: pawn king queen
// rajeev: rook bishop knight - all done

import { validateQueenMove } from "./pieceValidation/queen";
import { validateRookMove } from "./pieceValidation/rook";
import { validateBishopMove } from "./pieceValidation/bishop";
import { validateKnightMove } from "./pieceValidation/knight";

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
      return validateQueenMove(fromX, fromY, toX, toY, boardState, "w");
    case "wN":
      return validateKnightMove(fromX, fromY, toX, toY, "w");
    case "wR":
      return validateRookMove(fromX, fromY, toX, toY, boardState, "w");
    case "wB":
      return validateBishopMove(fromX, fromY, toX, toY, boardState, "w");
    case "bP":
      console.log("its a black pawn");
      break;
    case "bK":
      console.log("its a black king");
      break;
    case "bQ":
      return validateQueenMove(fromX, fromY, toX, toY, boardState, "b");
    case "bN":
      return validateKnightMove(fromX, fromY, toX, toY, "b");
    case "bR":
      return validateRookMove(fromX, fromY, toX, toY, boardState, "b");
    case "bB":
      return validateBishopMove(fromX, fromY, toX, toY, boardState, "w");

    default:
      break;
  }

  return true;
}
