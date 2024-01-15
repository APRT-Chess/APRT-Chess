import { Piece } from "../types/global";

export function getPieceColor(x: number, y: number, boardState: Piece[][]) {
  // piece names are stored as urls in boardState
  //  eg: /public/pieces/wQ.svg for white queen
  console.log('giveupman', boardState[y][x]);
  
  let color = boardState[y][x]
    .split("/")[3] // wQ.svg
    .split(".")[0][0]; // w
  return color;
}

export function getPieceType(x: number, y: number, boardState: Piece[][]) {
  let type = boardState[y][x]
    .split("/")[3] // wQ.svg
    .split(".")[0][1]; // Q
  return type;
}
