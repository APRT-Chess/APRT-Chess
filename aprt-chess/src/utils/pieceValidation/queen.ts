import { validateHorizontalMove } from "../pathChecks/horizontalCheck";
import { leftDiagonalCheck } from "../pathChecks/leftDiagonalCheck";
import { rightDiagonalCheck } from "../pathChecks/rightDiagonalCheck";
import { validateVerticalMove } from "../pathChecks/vertical";
import { PieceColor } from "./../validate";

export function validateQueenMove(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: string[][],
  pieceColor: PieceColor
): boolean {
  let verticalCheck = validateVerticalMove(fromX, fromY, toX, toY, boardState);
  let horizontalCheck = validateHorizontalMove(
    fromX,
    fromY,
    toX,
    toY,
    boardState
  );
  let rightDiaCheck = rightDiagonalCheck(fromX, fromY, toX, toY, boardState);
  let leftDiaCheck = leftDiagonalCheck(fromX, fromY, toX, toY, boardState);
  return rightDiaCheck || leftDiaCheck || verticalCheck || horizontalCheck;
}
