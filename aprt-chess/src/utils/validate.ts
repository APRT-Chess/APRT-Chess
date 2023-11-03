/* eslint-disable @typescript-eslint/no-unused-vars */
// apoorva: pawn king queen
// rajeev: rook bishop knight

type PieceColor = 'w' | 'b';

// all utility function go here

// return true if a tile is occupied
function isOccupied(x: number, y: number, boardState: string[][]): boolean {
  if (boardState[y][x]) 
    return true;
  else return false;
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
      console.log("its a white rook");
      // return checkRook(fromX, fromY, toX, toY, 'w')
      break;
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
      break;
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
  pieceColor: PieceColor
): boolean {
  if (
    (toX - fromX !== 0 && toY - fromY === 0) ||
    (toX - fromX === 0 && toY - fromY !== 0)
  ) {
    return true;
  }
  console.log("invalid rook move");
  return false;
}