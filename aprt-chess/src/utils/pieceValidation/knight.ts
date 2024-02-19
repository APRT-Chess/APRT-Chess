import { Piece } from "../../types/global";
import { calcDist, calcSlope } from "../mathFunctions";
import { validateCapture } from "../pathChecks/validateCaptureForOppositeColor";

export function validateKnightMove(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: Piece[][]
): boolean {
  const slope = Math.abs(calcSlope(fromX, fromY, toX, toY));
  const distance = Math.floor(calcDist(fromX, fromY, toX, toY));

  if ((slope === 0.5 || slope === 2) && distance === 2) {
    return validateCapture(fromX, fromY, toX, toY, boardState);
  } else return false;
}