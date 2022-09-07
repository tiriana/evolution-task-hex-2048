// shifts a list of 2048 numbers

const shift = (seq = []) => {
  const noZeros = seq.filter(Boolean);
  const newSeq = [];
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

let row;
row = [2, 2, 4, 8, 16, 32];
row = [2, 4, 2, 4];
row = [2, 2, 4, 4];

while (row.join() !== shift(row).join()) {
  console.log(row);
  row = shift(row);
}

console.log(row);
