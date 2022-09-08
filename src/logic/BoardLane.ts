import Board from "./Board";
import Direction from "./Direction";
import { BoardLaneIterator } from "./BoardLaneIterator";
import { Cell } from "./Cell";

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