import CellsLine from "./CellsLine";
import Board from "./Board";
import Cell from "./Cell";

describe("CellsLine", () => {
  let board: Board;

  beforeAll(() => {
    board = new Board(3);
    board.cells.forEach(
      (cell: Cell) => (cell.value = 100 * cell.x + 10 * cell.y + cell.z)
    );
  });

  test("Works for diagonal", () => {
    expect(
      new CellsLine(
        board,
        board.getCell(0, -2, 2),
        board.getCell(0, 2, -2)
      ).values()
    ).toEqual([-18, -9, 0, 9, 18]);
  });

  test("Works for chord", () => {
    expect(
      new CellsLine(
        board,
        board.getCell(-1, -1, 2),
        board.getCell(2, -1, -1)
      ).values()
    ).toEqual([-108, -9, 90, 189]);
  });

  test("Works for edge", () => {
    expect(
      new CellsLine(
        board,
        board.getCell(-2, 0, 2),
        board.getCell(0, -2, 2)
      ).values()
    ).toEqual([-198, -108, -18]);
  });

  test("fromValues should change cells values", () => {
    const line: CellsLine = new CellsLine(
      board,
      board.getCell(-2, 0, 2),
      board.getCell(0, -2, 2)
    );

    const values: number[] = line.values();

    line.fromValues([100]);

    expect(line.values()).toEqual([100, -108, -18]);

    line.fromValues([100, 200, 300, 400, 500]);

    expect(line.values()).toEqual([100, 200, 300]);
  });
});
