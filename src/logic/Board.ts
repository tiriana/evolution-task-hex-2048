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

  get isEmpty(): boolean {
    return this.value === 0;
  }

  get x(): number {
    return this.position.x;
  }
  get y(): number {
    return this.position.y;
  }
  get z(): number {
    return this.position.z;
  }
}

class BoardLane implements Iterable<Cell> {
  readonly board: Board;
  readonly direction: Direction;
  readonly handle: Cell;
  private iterator: Iterator<Cell> = new BoardLaneIterator(this);

  constructor(board: Board, direction: Direction, handle: Cell) {
    this.board = board;
    this.direction = direction;
    this.handle = handle;
  }

  [Symbol.iterator](): Iterator<Cell> {
    return this.iterator;
  }
}

class BoardLaneIterator implements Iterator<Cell | undefined> {
  private n: number = 0;
  private lane: BoardLane;

  constructor(boardLane: BoardLane) {
    this.lane = boardLane;
  }

  next(): IteratorResult<Cell> {
    const nextX: number = this.lane.handle.x + this.lane.direction.x * this.n;
    const nextY: number = this.lane.handle.y + this.lane.direction.y * this.n;
    const nextZ: number = this.lane.handle.z + this.lane.direction.z * this.n;

    const isLast: boolean =
      nextX === -this.lane.handle.x &&
      nextY === -this.lane.handle.y &&
      nextZ === -this.lane.handle.z;

    const cell: Cell = this.lane.board.getCell(nextX, nextY, nextZ) as Cell;

    return {
      done: isLast,
      value: cell,
    };
  }
}

export default class Board {
  radius: number;
  cells: Cell[];
  cube: Map<number, Map<number, Map<number, Cell>>> = new Map();
  lanes: Map<Direction, Cell[]> = new Map<Direction, Cell[]>();

  private howManyCells: number;

  constructor(radiusIncludingCenter: number = 2) {
    this.radius = radiusIncludingCenter - 1;
    this.howManyCells = 1 + 3 * this.radius * (this.radius + 1);
    // this.maxCellsInLine = 2 * this.radius + 1;
    this.cells = new Array(this.howManyCells);

    this.buildCells(); // could be done lazy, but there's no real need for this for this task
    this.buildLanes(); // same as above
  }

  getCell(x: number, y: number, z: number): Cell | undefined {
    return this.cube.get(x)?.get(y)?.get(z);
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
