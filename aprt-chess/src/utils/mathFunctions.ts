import { Piece } from "../types/global";

export function calcSlope(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): number {
  let slope: number = (toY - fromY) / (toX - fromX);
  return slope;
}

export function calcDist(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): number {
  let dist: number = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);
  return dist;
}

export function flipBoard(boardState: Piece[][]) {
  const updatedBoard = Array.from({ length: 8 }, () => Array(8).fill(""));
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      updatedBoard[7 - row][7 - col] = boardState[row][col];
    }
  }
  return updatedBoard;
}
