import Direction from "./Direction";
import Cell from "./Cell";
import { BoardLane } from "./BoardLane";
import { OutOfTheBoard } from "./OutOfTheBoard";
import CellsLine from "./CellsLine";
import { range } from "./utils";

// coordinates
// x (q) - top - bottom
// y (s) - top right - left bottom
// z (r) - top left - right bottom
//  ___
// / x \
// \y_z/

export default class Board {
  radius: number;
  ringsNum: number;
  cells: Cell[];
  cube: Map<number, Map<number, Map<number, Cell>>> = new Map();
  lanes: Map<Direction, BoardLane> = new Map<Direction, BoardLane>();

  edges: Map<Direction, CellsLine> = new Map<Direction, CellsLine>();

  private howManyCells: number;

  constructor(radiusIncludingCenter: number = 2) {
    this.radius = radiusIncludingCenter;
    this.ringsNum = this.radius - 1;
    this.howManyCells = 1 + 3 * this.ringsNum * (this.ringsNum + 1);
    // this.maxCellsInLine = 2 * this.radius + 1;
    this.cells = new Array(this.howManyCells);

    this.buildCells(); // could be done lazy, but there's no real need for this for this task
    this.buildLanes(); // same as above
  }

  getCell(x: number, y: number, z: number): Cell {
    const cell: Cell | undefined = this.cube.get(x)?.get(y)?.get(z);
    if (!cell) throw new OutOfTheBoard(this, x, y, z);
    return cell;
  }

  getEdge(direction: Direction): CellsLine {
    if (!this.edges.has(direction)) {
      const nextDirection: Direction = direction.nextCW();
      const vertex1: Cell = this.getCell(
        direction.x * this.radius,
        direction.y * this.radius,
        direction.z * this.radius
      );

      const vertex2: Cell = this.getCell(
        nextDirection.x * this.radius,
        nextDirection.y * this.radius,
        nextDirection.z * this.radius
      );

      this.edges.set(direction, new CellsLine(this, vertex1, vertex2));
    }
    return this.edges.get(direction) as CellsLine;
  }

  private buildCells(): void {
    let cellsCount = 0;
    for (let x = -this.radius; x <= this.radius; x++) {
      const minY = Math.max(-this.radius, -x - this.radius);
      const maxY = Math.min(this.radius, -x + this.radius);

      for (let y = minY; y <= maxY; y++) {
        this.addCell(new Cell(x, y, -x - y), cellsCount++);
      }
    }
  }

  private addCell(cell: Cell, position: number): void {
    this.cells[position] = cell;

    if (!this.cube.has(cell.x)) {
      this.cube.set(cell.x, new Map<number, Map<number, Cell>>());
    }

    const xLayer = this.cube.get(cell.x);

    if (!xLayer?.has(cell.y)) {
      xLayer?.set(cell.y, new Map<number, Cell>());
    }

    const yLayer = xLayer?.get(cell.y);

    yLayer?.set(cell.z, cell);
  }

  private buildLanes(): void {
    Direction.ALL_CLOCKWISE.forEach((direction: Direction) => {});
    // for Every direction there are 2*radius + 1 lanes
  }

  private findLanesForDirection(direction: Direction): void {}
}
