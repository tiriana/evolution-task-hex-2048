export const range: (
  start: number,
  end: number,
  inclusive: boolean
) => number[] = (
  start: number,
  end: number = start,
  inclusive: boolean = true
) => {
  const stepSize: -1 | 1 = start < end ? 1 : -1;
  const steps: number = Math.abs(end - start) + (inclusive ? 0 : -1);

  const range = new Array(steps);
  for (let step = 0, current = start; step <= steps; step++) {
    range[step] = current;
    current += stepSize;
  }

  return range;
};
