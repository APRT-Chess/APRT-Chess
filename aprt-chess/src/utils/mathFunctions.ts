export function calcSlope(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): number {
  let slope: number = (toY - fromY) / (toX - fromX);
  return slope;
}

export function calcDist(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): number {
  let dist: number = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);
  return dist;
}
