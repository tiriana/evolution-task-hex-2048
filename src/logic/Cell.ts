import Vector3 from "./Vector3";
import Board from "./Board";

class CellPosition extends Vector3<number> {}

export default class Cell {
  readonly position: CellPosition;
  value: number = 0;
  readonly board: Board;

  constructor(x: number, y: number, z: number, board: Board) {
    this.position = new CellPosition(x, y, z);
    this.board = board;
  }

  isEmpty(): boolean {
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

  get q(): number {
    return this.x;
  }

  get r(): number {
    return this.y;
  }

  get s(): number {
    return this.z;
  }
}
