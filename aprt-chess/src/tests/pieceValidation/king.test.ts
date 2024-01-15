import { test, expect } from "vitest";
import { validateKingMove } from "../../utils/pieceValidation/king";
import {
  whiteKing,
  blackKing,
  whiteRook,
  blackRook,
} from "../../utils/ChessPieces";

const emptyBoard: string[][] = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

test("king path validation upper right", async () => {
  const isValid = validateKingMove(1, 1, 2, 2, emptyBoard);

  expect(isValid).toBe(true);
});

test("king invalid path test", () => {
  const isValid = validateKingMove(2, 1, 3, 4, emptyBoard);

  expect(isValid).toBe(false);
});

test("left casteling test", () => {
  const board = structuredClone(emptyBoard);
  board[7][4] = whiteKing;
  board[7][0] = whiteRook;
  const isValid = validateKingMove(4, 7, 2, 7, board);

  expect(isValid).toBe(true);
});

test("right casteling test", () => {
  const board = structuredClone(emptyBoard);
  board[7][4] = blackKing;
  board[7][7] = blackRook;
  const isValid = validateKingMove(4, 7, 6, 7, board);

  expect(isValid).toBe(true);
});

test("Invalid left castling for white due to pieces in the way", () => {
  const board = structuredClone(emptyBoard);
  board[7][4] = whiteKing;
  board[7][0] = whiteRook;
  board[7][1] = whiteRook;
  const isValid = validateKingMove(4, 7, 2, 7, board);

  expect(isValid).toBe(false);
});

test("Invalid left castling for black due to pieces in the way", () => {
  const board = structuredClone(emptyBoard);
  board[7][4] = blackKing;
  board[7][0] = blackRook;
  board[7][1] = whiteRook;
  const isValid = validateKingMove(4, 7, 2, 7, board);

  expect(isValid).toBe(false);
});

test("Invalid right castling for white due to pieces in the way", () => {
  const board = structuredClone(emptyBoard);
  board[7][4] = whiteKing;
  board[7][7] = whiteRook;
  board[7][5] = whiteRook;
  const isValid = validateKingMove(4, 7, 6, 7, board);

  expect(isValid).toBe(false);
});

test("Invalid right castling for black due to pieces in the way", () => {
  const board = structuredClone(emptyBoard);
  board[7][4] = blackKing;
  board[7][7] = blackRook;
  board[7][5] = whiteRook;
  const isValid = validateKingMove(4, 7, 6, 7, board);

  expect(isValid).toBe(false);
});

test("Invalid as king and rook are of opposite color", () => {
  const board = structuredClone(emptyBoard);
  board[7][4] = blackKing;
  board[7][7] = whiteRook;
  const isValid = validateKingMove(4, 7, 6, 7, board);

  expect(isValid).toBe(false);
});
