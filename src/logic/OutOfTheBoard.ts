import Board from "./Board";

export class OutOfTheBoard extends Error {
  constructor(board: Board, x: number, y: number, z: number) {
    super(`Coordinates {x: ${x}, y: ${y}, z: ${z}} are not in the board`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, OutOfTheBoard.prototype);
  }
}