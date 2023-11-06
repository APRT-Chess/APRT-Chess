import { PieceColor } from './../validate';
import { isPathClear } from "../pathClear";

export function validateRookMove(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    boardState: string[][],
    pieceColor: PieceColor
  ): boolean {
    if (
      (toX - fromX !== 0 && toY - fromY === 0) ||
      (toX - fromX === 0 && toY - fromY !== 0)
    ) {
      if (isPathClear(fromX, fromY, toX, toY, boardState)) {
        console.log("path is clear");
        return true;
      } 
      else 
        return false;
    }
    console.log("invalid rook move");
    return false;
  }
  