/* eslint-disable @typescript-eslint/no-unused-vars */
// apoorva: pawn king queen
// rajeev: rook bishop knight

type PieceColor = "w" | "b";

// all utility function go here

// return true if a tile is occupied
function isOccupied(x: number, y: number, boardState: string[][]): boolean {
  if (boardState[y][x]) 
    return true;
  else 
    return false;
}

// returns true if path is clear
// NOTE it will only work for straight & diagonal paths
// else it will return false
function isPathClear(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: string[][]
): boolean {
  // if path is vertical
  if (toX - fromX === 0) {
    const verticalDist = Math.abs(toY - fromY);
    for (let i = 1; i < verticalDist; i++) {
      const multiplier = toY < fromY ? -1 : 1;
      const passedTile = fromY + i * multiplier;
      if (boardState[passedTile][fromX]) {
        console.log("blocked by other piece");
        return false;
      }
    }
    return true;
  }
  // if path is horizontal
  else if (toY - fromY === 0) {
    const horizontalDist = Math.abs(toX - fromX);
    for (let i = 1; i < horizontalDist; i++) {
      const multiplier = toX < fromY ? -1 : 1;
      const passedTile = fromX + i * multiplier;
      if (boardState[fromY][passedTile]) {
        console.log("blocked by other piece");
        return false;
      }
    }
    return true;
  }
  // if path is diagonal
  else if (Math.abs(toY - fromY - toX + fromX) === 0) {
    console.log("implement on you own lol");
  }
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
      console.log("its a white pawn");
      break;
    case "wK":
      console.log("its a white king");
      break;
    case "wQ":
      console.log("its a white queen");
      break;
    case "wN":
      console.log("its a white knight");
      break;
    case "wR":
      return checkRook(fromX, fromY, toX, toY, boardState, "w");
    case "wB":
      console.log("its a white bishop");
      break;
    case "bP":
      console.log("its a black pawn");
      break;
    case "bK":
      console.log("its a black king");
      break;
    case "bQ":
      console.log("its a black queen");
      break;
    case "bN":
      console.log("its a black knight");
      break;
    case "bR":
      console.log("its a black rook");
      return checkRook(fromX, fromY, toX, toY, boardState, "b");
    case "bB":
      console.log("its a black bishop");
      break;

    default:
      break;
  }

  return true;
}

// all move validation function go here
// naming convention `check${PieceName}`

function checkRook(
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
