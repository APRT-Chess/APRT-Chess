import { Piece } from "../../types/global";
import { calcDist } from "../mathFunctions";
import { validateCastle } from "../pathChecks/castleValidation";
import { validateCapture } from "../pathChecks/validateCaptureForOppositeColor";

// king move is valid iff Math.floor(dist(to, from)) === 1
// kill move not yet implemented

export function validateKingMove(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: Piece[][]
): boolean {
  //checking castling conditions

  const isValidCastle = validateCastle(fromX, fromY, toX, toY, boardState);
  if (isValidCastle) return true;

  const distance = Math.floor(calcDist(fromX, fromY, toX, toY));
  if (distance === 1)
    return validateCapture(fromX, fromY, toX, toY, boardState);
  else return false;
}
