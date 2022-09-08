import Board from "./Board";
import Direction from "./Direction";
import { Cell } from "./Cell";

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

export class BoardLane implements Iterable<Cell> {
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
