import Cell from "./Cell";
import Board from "./Board";

describe("Cell", () => {
  test.each([NaN, null, 0, false, ""])(
    "Value is set to % when passed %",
    (falsy) => {
      const cell: Cell = new Cell(0, 0, 0, new Board(1));
      (<any>cell.value) = falsy;

      expect(cell.value).toBe(0);
    }
  );

  test("isEmpty should return true for zero and false for other values", () => {
    const cell: Cell = new Cell(0, 0, 0, new Board(1));

    for (let i = 1; i <= 4096; i *= 2) {
      cell.value = i;
      expect(cell.isEmpty()).toBe(false);
    }
    cell.value = 0;
    expect(cell.isEmpty()).toBe(true);
  });

  test("[q, r, s] coords", () => {
    const cell: Cell = new Cell(1, 2, 3, new Board(1));

    expect(cell.q).toBe(cell.x);
    expect(cell.q).toBe(1);
    expect(cell.r).toBe(cell.y);
    expect(cell.r).toBe(2);
    expect(cell.s).toBe(cell.z);
    expect(cell.s).toBe(3);
  });
});
