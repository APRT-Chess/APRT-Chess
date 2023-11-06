// validate horizontal moves

export function validateHorizontalMove(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    boardState: string[][]):boolean{

    if (toY - fromY === 0) {
        const horizontalDist = Math.abs(toX - fromX);
        for (let i = 1; i < horizontalDist; i++) {
          const multiplier = toX < fromX ? -1 : 1;
          const passedTile = fromX + i * multiplier;
          if (boardState[fromY][passedTile]) {
            console.log("blocked by other piece");
            return false;
          }
        }
        return true;
      }
    return false;
}
