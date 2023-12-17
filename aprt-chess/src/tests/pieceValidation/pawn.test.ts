import { test, expect } from "vitest";
import { validatePawnMove } from "../../utils/pieceValidation/pawn";

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

test("pawn valid 2 block forward move", () => {
  const board = structuredClone(emptyBoard);
  board[6][2] = "/public/pieces/wP.svg";
  const isValid = validatePawnMove(2, 6, 2, 4, board);

  expect(isValid).toBe(true);
});

test("pawn valid 1 block forward move", () => {
  const board = structuredClone(emptyBoard);
  board[3][2] = "/public/pieces/wP.svg";
  const isValid = validatePawnMove(2, 3, 2, 2, board);

  expect(isValid).toBe(true);
});

test("pawn invalid 2 block forward move", () => {
  const board = structuredClone(emptyBoard);
  board[6][2] = "/public/pieces/wP.svg";
  const isValid = validatePawnMove(2, 6, 2, 3, board);

  expect(isValid).toBe(false);
});

test("pawn invalid backward move", () => {
  const board = structuredClone(emptyBoard);
  board[3][2] = "/public/pieces/wP.svg";
  const isValid = validatePawnMove(2, 3, 2, 4, board);

  expect(isValid).toBe(false);
});

test("pawn invalid sideways move", () => {
  const board = structuredClone(emptyBoard);
  board[3][2] = "/public/pieces/wP.svg";
  const isValid = validatePawnMove(2, 3, 4, 3, board);

  expect(isValid).toBe(false);
});

test("pawn invalid diagonal move", () => {
  const board = structuredClone(emptyBoard);
  board[3][2] = "/public/pieces/wP.svg";
  const isValid = validatePawnMove(2, 3, 1, 2, board);

  expect(isValid).toBe(false);
});

test("pawn invalid 2 square move blocked by another piece", () => {
  const board = Array.from(emptyBoard, (row) => [...row]);
  board[6][2] = "/public/pieces/wP.svg";
  board[5][2] = "/public/pieces/bQ.svg";
  const isValid = validatePawnMove(2, 6, 2, 4, board);

  expect(isValid).toBe(false);
});

test("pawn invalid 2 square forward move kill", () => {
  const board = Array.from(emptyBoard, (row) => [...row]);
  board[6][2] = "/public/pieces/wP.svg";
  board[4][2] = "/public/pieces/bQ.svg";
  const isValid = validatePawnMove(2, 6, 2, 4, board);

  expect(isValid).toBe(false);
});
