import { Piece } from "../types/global";

// piece names are stored as urls in boardState
//  eg: /public/pieces/wQ.svg for white queen

export function getPieceColor(x: number, y: number, boardState: Piece[][]) {
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

export function getPieceName(
  x: number,
  y: number,
  boardState: Piece[][]
): string {
  if (!boardState[y][x]) {
    return "";
  }
  let pieceName: string = boardState[y][x]
    .split("/")[3] // wQ.svg
    .split(".")[0]; // wQ
  return pieceName;
}
