import { Piece } from "../types/global";

// piece names are stored as urls in boardState
// eg: /public/pieces/wQ.svg for white queen
// after build url: https://aprt-chess-frontend.onrender.com/assets/wQ-2ff237fc.svg

// adjusting the utility functions to work after build

export function getPieceColor(x: number, y: number, boardState: Piece[][]) {
  if (!boardState[y][x]) {
    console.log("empty boardState passed in getPieceColor");
    return "";
  }
  // let color = boardState[y][x]
  //   .split("/")[3] // wQ.svg
  //   .split(".")[0][0]; // w
  const color: string = boardState[y][x]
  .split("/")[4]  // wQ-asdf.svg
  .split("-")[0][0]; // w
  return color;
}

export function getPieceType(x: number, y: number, boardState: Piece[][]) {
  if (!boardState[y][x]) {
    console.log("empty boardState passed in getPieceType");
    return "";
  }
  // let type = boardState[y][x]
  //   .split("/")[3] // wQ.svg
  //   .split(".")[0][1]; // Q
  const type: string = boardState[y][x]
  .split("/")[4]  // wQ-asdf.svg
  .split("-")[0][1]; // Q
  return type;
}

export function getPieceName(
  x: number,
  y: number,
  boardState: Piece[][]
): string {
  if (!boardState[y][x]) {
    console.log("empty boardState passed in getPieceName");
    return "";
  }
  // let pieceName: string = boardState[y][x]
  //   .split("/")[3] // wQ.svg
  //   .split(".")[0]; // wQ
  const pieceName: string = boardState[y][x]
    .split("/")[4]  // wQ-asdf.svg
    .split("-")[0]; // wQ
  return pieceName;
}
