import { validateCapture } from "./validateCaptureForOppositeColor";

//validate vertical moves;

export function verticalPathCheck(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  boardState: string[][]
): boolean {
  // if path is vertical
  if (toX - fromX === 0) {
    const verticalDist = Math.abs(toY - fromY);
    for (let i = 1; i < verticalDist; i++) {
      const multiplier = toY < fromY ? -1 : 1;
      const passedTile = fromY + i * multiplier;
      if (boardState[passedTile][fromX]) {
        console.log("blocked by other piece");
        return false;
      }
    }
    
    return validateCapture(fromX, fromY, toX, toY, boardState);
  }
  return false;
}
