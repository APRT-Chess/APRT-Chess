import { test, expect } from "vitest";
import { validateKnightMove } from "../../utils/pieceValidation/knight";

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

test("case: valid knight move right down", async () => {
  const board = structuredClone(emptyBoard);
  board[2][1] = "/public/pieces/bK.svg";
  const isValid = validateKnightMove(1, 2, 3, 1, board);

  expect(isValid).toBe(true);
});

test("case: invalid knight move", async () => {
  const board = structuredClone(emptyBoard);
  board[2][1] = "/public/pieces/bK.svg";
  const isValid = validateKnightMove(1, 2, 4, 5, board);

  expect(isValid).toBe(false);
});
