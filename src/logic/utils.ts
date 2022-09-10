export const range: (
  start: number,
  end: number,
  inclusive?: boolean
) => number[] = (
  start: number,
  end: number = start,
  inclusive: boolean = true
) => {
  const stepSize: -1 | 1 = start < end ? 1 : -1;
  const steps: number = Math.abs(end - start) + (inclusive ? 0 : -1);

  if (steps < 0) return [];

  const range = new Array(steps);
  for (let step = 0, current = start; step <= steps; step++) {
    range[step] = current;
    current += stepSize;
  }

  return range;
};

export const shift: (s: number[]) => number[] = (line: number[] = []) => {
  line = [...line].reverse();

  let modLine = line.filter(Boolean);

  for (let i = 1; i < modLine.length; i++) {
    if (modLine[i] === modLine[i - 1]) {
      modLine[i - 1] *= 2;
      modLine[i] = 0;
    }
  }

  modLine = modLine.filter(Boolean);
  return modLine
    .concat(new Array(line.length - modLine.length).fill(0))
    .reverse();
};
