// this is just a small function checking if single row from 2048 game can shift forward (or 'right')
// this needs to be generalized to a haxagonal board board

const canShift = (row) => {
  for (let i = 0; i < row.length - 1; i++) {
    const curr = row[i];
    const next = row[i + 1];

    if (curr === 0 || next === 0 || curr === next) return true;
  }
  return false;
};

const tests = [
  [2, 4],
  [4, 4],
  [2, 4, 0],
];

tests.forEach((row) => {
  console.log(`${row} - ${canShift(row)}`);
});
