import { test, expect } from "vitest";
import { validateKingMove } from "../../utils/pieceValidation/king";

test("king path validation upper right", async () => {
  const isValid = validateKingMove(1, 1, 2, 2, "w");

  expect(isValid).toBe(true);
});

test("king invalid path test", () => {
    const isValid = validateKingMove(2, 1, 3, 4, "b");

    expect(isValid).toBe(false);
})