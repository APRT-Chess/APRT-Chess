import { getPieceColor } from "../pieceUtils";

// it returns false incase of friendly fire
export function validateCapture(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: string[][]
): boolean {
  let currentPieceColor = getPieceColor(fromX, fromY, boardState);
  console.log("attacking piece color:", currentPieceColor);

  if (boardState[toY][toX]) {
    let capturedPieceColor = getPieceColor(toX, toY, boardState);
    console.log("captured piece color:", capturedPieceColor);

    if (currentPieceColor !== capturedPieceColor) {
      return true;
    } else {
      console.log("friendly fire");
      return false;
    }
  } else {
    return true;
  }
  return false;
}
