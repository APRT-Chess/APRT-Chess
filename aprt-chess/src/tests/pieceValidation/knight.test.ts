import { test, expect } from 'vitest';
import { validateKnightMove } from '../../utils/pieceValidation/knight';

test('case: valid knight move right down', async () => {

  const isValid = validateKnightMove(1, 2, 3, 1);

  expect(isValid).toBe(true);
});

test('case: invalid knight move', async () => {

  const isValid = validateKnightMove(1, 2, 4, 5);

  expect(isValid).toBe(false);
});
