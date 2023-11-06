import { rightDiagonalUpCheck } from '../pathChecks/rightDiagonalUpCheck' ;
import { PieceColor } from './../validate';

export function validateQueenMove(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    boardState: string[][],
    pieceColor: PieceColor
  ):boolean
  {
    return rightDiagonalUpCheck(fromX,fromY,toX,toY,boardState);
  }