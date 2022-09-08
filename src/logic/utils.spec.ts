import { range } from "./utils";

describe("range", () => {
  //prettier-ignore
  test.each([
    [[2, 3, 4, 5], 2 ,5],
    [[4, 3, 2, 1, 0, -1, -2], 4 , -2],
    [[0], 0 , 0],
  ])("returns [%s] for (%s, %s)", (expected, start, end) => {
    expect(range(start, end)).toEqual(expected)
  } )
});
