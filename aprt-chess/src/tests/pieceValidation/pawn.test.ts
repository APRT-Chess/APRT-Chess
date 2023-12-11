import { test, expect } from "vitest";
import { validatePawnMove } from "../../utils/pieceValidation/pawn";
import { e } from "vitest/dist/reporters-3OMQDZar";

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
  const isValid = validatePawnMove(2, 6, 2, 4, emptyBoard, "w");

  expect(isValid).toBe(true);
});

test("pawn valid 1 block forward move", () => {
  const isValid = validatePawnMove(2, 3, 2, 2, emptyBoard, "w");

  expect(isValid).toBe(true);
});

test("pawn invalid 2 block forward move", () => {
  const isValid = validatePawnMove(2, 6, 2, 3, emptyBoard, "w");

  expect(isValid).toBe(false);
});

test("pawn invalid backward move", () => {
  const isValid = validatePawnMove(2, 3, 2, 4, emptyBoard, "w");

  expect(isValid).toBe(false);
});

test("pawn invalid sideways move", () => {
  const isValid = validatePawnMove(2, 3, 4, 3, emptyBoard, "w");

  expect(isValid).toBe(false);
});

test("pawn invalid diagonal move", () => {
  const isValid = validatePawnMove(2, 3, 1, 2, emptyBoard, "w");

  expect(isValid).toBe(false);
});

test("pawn invalid 2 square move blocked by another piece", () => {
  const board = [...emptyBoard];
  board[5][2] = "block";
  const isValid = validatePawnMove(2, 6, 2, 4, board, "w");

  expect(isValid).toBe(false);
});

test("pawn invalid 2 square forward move kill", () => {
    const board = [...emptyBoard];
    board[4][2] = "block";
    const isValid = validatePawnMove(2, 6, 2, 4, board, "w");
  
    expect(isValid).toBe(false);
  })