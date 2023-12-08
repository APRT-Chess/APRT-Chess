import { PieceColor } from "../validate";

function calcSlope(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): number {
  let slope: number = (toY - fromY) / (toX - fromX);
  return slope;
}

function calcDist(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): number {
  let dist: number = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);
  return dist;
}

export function validateKnightMove(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  pieceColor: PieceColor
): boolean {
  const slope = Math.abs(calcSlope(fromX, fromY, toX, toY));
  const distance = Math.floor(calcDist(fromX, fromY, toX, toY));

  if ((slope === 0.5 || slope === 2) && distance === 2) {
    return true;
  } else return false;
}
