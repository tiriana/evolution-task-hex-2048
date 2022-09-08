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

export const shift: (s: number[]) => number[] = (seq: number[] = []) => {
  const noZeros: number[] = seq.filter(Boolean);
  const newSeq: number[] = [];
  for (let i = 0; i < noZeros.length; i++) {
    const curr = noZeros[i];
    const next = noZeros[i + 1];
    if (!curr) {
      continue; // nothing to do
    }
    if (!next) {
      newSeq.push(curr); // this is the last number - just add it to the new sequence
      continue;
    }
    if (next === curr) {
      newSeq.push(curr << 1); // Add numbers and add to new sequence
      i++; // 'swallow' one of the numbers
      continue;
    }
    newSeq.push(curr);
  }
  const zeros = [...Array(seq.length - newSeq.length)].fill(0); // TODO - use for loop to uptimize
  return [...zeros, ...newSeq];
};
