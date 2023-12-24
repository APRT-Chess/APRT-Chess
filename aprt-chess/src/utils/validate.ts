// moves: castling & en passant & pawn capture remaining

import { validateQueenMove } from "./pieceValidation/queen";
import { validateRookMove } from "./pieceValidation/rook";
import { validateBishopMove } from "./pieceValidation/bishop";
import { validateKnightMove } from "./pieceValidation/knight";
import { validateKingMove } from "./pieceValidation/king";
import { validatePawnMove } from "./pieceValidation/pawn";
import { Piece, PieceColor } from "../types/global";

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
  currentPlayerColor: PieceColor,
  boardState: Piece[][]
): boolean {
  console.log("is occupied:", isOccupied(toX, toY, boardState));

  if (currentPlayerColor === "w") {
    switch (pieceName) {
      case "wP":
        return validatePawnMove(fromX, fromY, toX, toY, boardState);
      case "wK":
        return validateKingMove(fromX, fromY, toX, toY,boardState);
      case "wQ":
        return validateQueenMove(fromX, fromY, toX, toY, boardState);
      case "wN":
        return validateKnightMove(fromX, fromY, toX, toY);
      case "wR":
        return validateRookMove(fromX, fromY, toX, toY, boardState);
      case "wB":
        return validateBishopMove(fromX, fromY, toX, toY, boardState);

      default:
        break;
    }
  } else {
    switch (pieceName) {
      case "bP":
        return validatePawnMove(fromX, fromY, toX, toY, boardState);
      case "bK":
        return validateKingMove(fromX, fromY, toX, toY,boardState);
      case "bQ":
        return validateQueenMove(fromX, fromY, toX, toY, boardState);
      case "bN":
        return validateKnightMove(fromX, fromY, toX, toY);
      case "bR":
        return validateRookMove(fromX, fromY, toX, toY, boardState);
      case "bB":
        return validateBishopMove(fromX, fromY, toX, toY, boardState);

      default:
        break;
    }
  }

  return false;
}
