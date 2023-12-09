import { test, expect } from "vitest";
import { validateRookMove } from "../../utils/pieceValidation/rook";

test("valid rook vertical move test", () => {
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
  const isValid = validateRookMove(3, 2, 3, 6, emptyBoard, "b");

  expect(isValid).toBe(true);
});

test("valid rook horizontal move test", () => {
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
  const isValid = validateRookMove(3, 2, 4, 2, emptyBoard, "b");

  expect(isValid).toBe(true);
});

test("invalid rook slant move test", () => {
  const boardState: string[][] = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];
  const isValid = validateRookMove(3, 2, 6, 6, boardState, "b");

  expect(isValid).toBe(false);
});

test("invalid path blocked move test", () => {
    const boardState: string[][] = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "block", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
    const isValid = validateRookMove(3, 2, 3, 4, boardState, 'b');
  
    expect(isValid).toBe(false);
  });