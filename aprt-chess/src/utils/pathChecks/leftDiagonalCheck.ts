export function leftDiagonalCheck(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: string[][]
): boolean {
  //first if condn checks if its a valid diagonal move
  if (Math.abs(toX - fromX) == Math.abs(fromY - toY)) {
    //left downwards move
    if (toX < fromX && toY > fromY) {
      let i = fromX - 1;
      let j = fromY + 1;
      while (i >= toX && j <= toY) {
        if (boardState[j][i]) {
          console.log(
            "downward left diagonal move blocked by a piece at x:",
            i,
            ",y:",
            j
          );
          return false;
        }

        i--;
        j++;
      }

      //if the control comes here, means no piece blocking the move;
      return true;
    }

    if (fromX > toX && fromY > toY) {
      let i = fromX - 1;
      let j = fromY - 1;
      while (i >= toX && j >= toY) {
        if (boardState[j][i]) {
          console.log(
            "upwards left diagonal move blocked by a piece at x:",
            i,
            ",y:",
            j
          );
          return false;
        }

        i--;
        j--;
      }

      //if the control comes here, means no piece blocking the move;
      return true;
    }
    return false;
  }

  // if the move doesn't fit in any of these it is invalid so return false;
  return false;
}
