import { test, expect } from "vitest";
import { validateRookMove } from "../../utils/pieceValidation/rook";

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

test("valid rook vertical move test", () => {
  const board = structuredClone(emptyBoard);
  board[2][3] = "/public/pieces/bR.svg";
  const isValid = validateRookMove(3, 2, 3, 6, board, "b");

  expect(isValid).toBe(true);
});

test("valid rook horizontal move test", () => {
  const board = structuredClone(emptyBoard);
  board[2][3] = "/public/pieces/bR.svg";
  const isValid = validateRookMove(3, 2, 4, 2, board, "b");

  expect(isValid).toBe(true);
});

test("invalid rook slant move test", () => {
  const board = structuredClone(emptyBoard);
  board[2][3] = "/public/pieces/bR.svg";
  const isValid = validateRookMove(3, 2, 6, 6, board, "b");

  expect(isValid).toBe(false);
});

test("invalid path blocked move test", () => {
  const board = structuredClone(emptyBoard);
  board[2][3] = "/public/pieces/bR.svg";
  board[3][3] = "/public/pieces/wN.svg";
  const isValid = validateRookMove(3, 2, 3, 4, board, "b");

  expect(isValid).toBe(false);
});
