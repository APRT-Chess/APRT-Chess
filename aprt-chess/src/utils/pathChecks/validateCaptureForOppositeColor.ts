export function validateCapture(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: string[][]
): boolean {
  let currentPieceColor = boardState[fromY][fromX]
    .split("/")[3]
    .split(".")[0][0];
  console.log("capturing piece color:", currentPieceColor);
  if (boardState[toY][toX]) {
    let capturedPieceColor = boardState[toY][toX]
      .split("/")[3]
      .split(".")[0][0];
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
