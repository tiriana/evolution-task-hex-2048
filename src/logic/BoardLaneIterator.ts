import { Cell } from "./Cell";
import { BoardLane } from "./BoardLane";

export class BoardLaneIterator implements Iterator<Cell | undefined> {
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