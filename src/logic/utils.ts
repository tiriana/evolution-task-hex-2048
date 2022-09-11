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
  const result: number[] = new Array<number>(line.length);
  let l: number = line.length - 1; // last empty
  let z: number = 0; // zero index
  let mem: number = 0;

  for (let i = l; i >= 0; i--) {
    if (line[i] === 0) {
      result[z] = 0;
      z++;
      continue;
    }
    if (mem === line[i]) {
      // merge
      result[l + 1] = line[i] << 1;
      result[z] = 0;
      z++;
      mem = 0;
      continue;
    }
    //shift
    mem = result[l] = line[i];
    l--;
  }

  return result;
};
