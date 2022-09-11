import { range, shift } from "./utils";

describe("range", () => {
  test.each([
    [[2, 3, 4, 5], 2, 5, undefined],
    [[4, 3, 2, 1, 0, -1, -2], 4, -2, undefined],
    [[0], 0, 0, undefined],
    [[2, 3, 4], 2, 5, false],
    [[4, 3, 2, 1, 0, -1], 4, -2, false],
    [[], 0, 0, false],
  ])("returns [%s] for (%s, %s)", (expected, start, end, inclusive) => {
    expect(range(start, end, inclusive)).toEqual(expected);
  });
});

describe("shift", () => {
  test.each([
    [
      [2, 2],
      [0, 4],
    ],
    [
      [2, 2, 2],
      [0, 2, 4],
    ],
    [
      [2, 2, 4],
      [0, 4, 4],
    ],
    [
      [4, 2, 2],
      [0, 4, 4],
    ],
    [
      [2, 4, 2, 4],
      [2, 4, 2, 4],
    ],
    [
      [2, 2, 4, 4],
      [0, 0, 4, 8],
    ],
    [
      [0, 0, 16, 2, 0, 2, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 4, 8],
    ],
  ])("returns [%s] for (%s, %s)", (beforeShift, afterShift) => {
    expect(shift(beforeShift)).toEqual(afterShift);
  });
});
