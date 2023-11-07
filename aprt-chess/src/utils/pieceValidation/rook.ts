import { PieceColor } from "../validate";
import { validateHorizontalMove } from "../pathChecks/horizontalCheck";
import { verticalPathCheck } from "../pathChecks/verticalCheck";

export function validateRookMove(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: string[][],
  pieceColor: PieceColor
): boolean {
  if (
    verticalPathCheck(fromX, fromY, toX, toY, boardState) ||
    validateHorizontalMove(fromX, fromY, toX, toY, boardState)
  ) {
    console.log("path is clear");
    return true;
  } else {
    console.log("invalid rook move");
    return false;
  }
}
