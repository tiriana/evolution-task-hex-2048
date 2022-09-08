import Direction from "./Direction";
import Vector3 from "./Vector3";

// coordinates
// x (q) - top - bottom
// y (s) - top right - left bottom
// z (r) - top left - right bottom
//  ___
// / x \
// \y_z/

class CellPosition extends Vector3<number> {}

class Cell {
  position: CellPosition;
  value: number = 0;

  constructor(x: number, y: number, z: number) {
    this.position = new CellPosition(x, y, z);
  }

  get x() {
    return this.position.x;
  }
  get y() {
    return this.position.y;
  }
  get z() {
    return this.position.z;
  }
}

export default class Board {
  radius: number;
  cells: Cell[];
  cube: Map<number, Map<number, Map<number, Cell>>> = new Map();

  private howManyCells: number;
  private maxCellsInLine: number;

  constructor(radiusIncludingCenter: number = 2) {
    this.radius = radiusIncludingCenter - 1;
    this.howManyCells = 1 + 3 * this.radius * (this.radius + 1);
    this.maxCellsInLine = 2 * this.radius + 1;
    this.cells = new Array(this.howManyCells);

    this.buildCells(); // could be done lazy, but there's no real need for this for this task

    this.findLanes();
  }

  buildCells(): void {
    let cellsCount = 0;
    for (let x = -this.radius; x <= this.radius; x++) {
      const minY = Math.max(-this.radius, -x - this.radius);
      const maxY = Math.min(this.radius, -x + this.radius);

      for (let y = minY; y <= maxY; y++) {
        this.addCell(new Cell(x, y, -x - y), cellsCount++);
      }
    }
  }

  addCell(cell: Cell, position: number): void {
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

  findLanes(): void {}
}
