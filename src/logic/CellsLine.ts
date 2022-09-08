import Board from "./Board";
import { range } from "./utils";
import { OutOfTheBoard } from "./OutOfTheBoard";
import { Cell } from "./Cell";

class CellsLine {
  readonly board: Board;
  readonly start: Cell;
  readonly end: Cell;
  private cells!: Cell[];

  constructor(board: Board, start: Cell, end: Cell) {
    this.board = board;
    this.start = start;
    this.end = end;
    this.build();
  }

  private build(): void {
    const xRange = range(this.start.x, this.end.x);
    const yRange = range(this.start.y, this.end.y);
    const zRange = range(this.start.z, this.end.z);

    this.cells = new Array(
        Math.max(xRange.length, yRange.length, zRange.length)
    );

    for (let i = 0; i < this.cells.length; i++) {
      const x = xRange[i % xRange.length];
      const y = yRange[i % yRange.length];
      const z = zRange[i % zRange.length];

      const cell: Cell | undefined = this.board.getCell(x, y, z);

      if (!cell) throw new OutOfTheBoard(this.board, x, y, z);

      this.cells[i] = cell;
    }
  }
}