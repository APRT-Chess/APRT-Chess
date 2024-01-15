import { Piece } from "../../types/global";
import { blackRook, whiteRook } from "../ChessPieces";
import { getPieceColor, getPieceType } from "../pieceUtils";
import { socket } from "../socket/socket";

// this function is triggered for any movement of king
export function validateCastle(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: Piece[][]
): boolean {
  const currentColor = getPieceColor(fromX, fromY, boardState);

  // following block to check if casteling is attempted to right
  if (fromX == 4 && toX == 6 && fromY == 7 && toY == 7) {
    // todo: fix this if case & make it reversible for both colors
    if (
      boardState[7][5] == "" &&
      boardState[7][6] == "" &&
      getPieceType(7, 7, boardState) == "R" &&
      currentColor == getPieceColor(7, 7, boardState)
    ) {
      const existingBoardState: Piece[][] = [...boardState];
      existingBoardState[7][5] =
        boardState[7][7] == blackRook ? blackRook : whiteRook;
      existingBoardState[7][7] = "";
      socket.emit("update-board", existingBoardState);

      return true;
    }
  }
  // following block to check if casteling is attempted to left
  else if (fromX == 4 && toX == 2 && fromY == 7 && toY == 7) {
    if (
      boardState[7][3] == "" &&
      boardState[7][2] == "" &&
      boardState[7][1] == "" &&
      getPieceType(0, 7, boardState) == "R" &&
      currentColor == getPieceColor(0, 7, boardState)
    ) {
      const existingBoardState: Piece[][] = [...boardState];
      existingBoardState[7][3] =
        boardState[7][0] == blackRook ? blackRook : whiteRook;
      existingBoardState[7][0] = "";
      socket.emit("update-board", existingBoardState);
      return true;
    }
  }
  return false;
}
