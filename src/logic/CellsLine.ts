import Board from "./Board";
import { range } from "./utils";
import Cell from "./Cell";

export default class CellsLine {
  readonly board: Board;
  readonly start: Cell;
  readonly end: Cell;
  private _cells!: Cell[];

  get cells(): Cell[] {
    return this._cells;
  }

  constructor(board: Board, start: Cell, end: Cell) {
    this.board = board;
    this.start = start;
    this.end = end;
    this.build(); // TODO: use Iterator instead of creating an array in constructor
  }

  private build(): void {
    const xRange = range(this.start.x, this.end.x);
    const yRange = range(this.start.y, this.end.y);
    const zRange = range(this.start.z, this.end.z);

    this._cells = new Array(
      Math.max(xRange.length, yRange.length, zRange.length)
    );

    for (let i = 0; i < this._cells.length; i++) {
      const x = xRange[i % xRange.length];
      const y = yRange[i % yRange.length];
      const z = zRange[i % zRange.length];

      this._cells[i] = this.board.getCell(x, y, z);
    }

    Object.freeze(this._cells);
  }

  values(): number[] {
    return this.cells.map((cell: Cell) => cell.value);
  }

  fromValues(newValues: number[] = []): this {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].value = newValues[i];
    }
    return this;
  }
}
