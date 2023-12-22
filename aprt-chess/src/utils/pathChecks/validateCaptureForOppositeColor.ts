

function getPieceColor(x: number, y: number, boardState: string[][]) {
  // piece names are stored as urls in boardState
  //  eg: /public/pieces/wQ.svg for white queen
  let color = boardState[y][x]
  .split("/")[3]        // wQ.svg
  .split(".")[0][0];    // w
  return color;
}

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
