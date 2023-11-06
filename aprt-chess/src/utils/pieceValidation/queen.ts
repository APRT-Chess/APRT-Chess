import { rightDiagonalCheck } from '../pathChecks/rightDiagonalCheck' ;
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
    return rightDiagonalCheck(fromX,fromY,toX,toY,boardState);
  }