import Board from "./Board";
import Cell from "./Cell";
import Direction from "./Direction";

describe("game board", () => {
  describe("getEdge", () => {
    let board: Board;

    beforeAll(() => {
      board = new Board(1);
      board.cells.forEach((cell: Cell, index) => (cell.value = index));
    });

    test.each([
      ["UP", Direction.UP, [4, 6]],
      ["RIGHT_UP", Direction.RIGHT_UP, [6, 5]],
      ["RIGHT_DOWN", Direction.RIGHT_DOWN, [5, 2]],
      ["DOWN", Direction.DOWN, [2, 0]],
      ["LEFT_DOWN", Direction.LEFT_DOWN, [0, 1]],
      ["LEFT_UP", Direction.LEFT_UP, [1, 4]],
    ])(
      "Should return correct edge for direction %s",
      (_, direction: Direction, values: number[]) => {
        expect(board.getEdge(direction).values()).toEqual(values);
      }
    );
  });

  describe("getChords", () => {
    let board: Board;

    beforeAll(() => {
      board = new Board(1);
      board.cells.forEach((cell: Cell, index) => (cell.value = index));
    });

    test.each([
      [
        "UP",
        Direction.UP,
        [
          [5, 6],
          [2, 3, 4],
          [0, 1],
        ],
      ],
      [
        "RIGHT_UP",
        Direction.RIGHT_UP,
        [
          [2, 5],
          [0, 3, 6],
          [1, 4],
        ],
      ],
      [
        "RIGHT_DOWN",
        Direction.RIGHT_DOWN,
        [
          [0, 2],
          [1, 3, 5],
          [4, 6],
        ],
      ],
      [
        "DOWN",
        Direction.DOWN,
        [
          [1, 0],
          [4, 3, 2],
          [6, 5],
        ],
      ],
      [
        "LEFT_DOWN",
        Direction.LEFT_DOWN,
        [
          [4, 1],
          [6, 3, 0],
          [5, 2],
        ],
      ],
      [
        "LEFT_UP",
        Direction.LEFT_UP,
        [
          [6, 4],
          [5, 3, 1],
          [2, 0],
        ],
      ],
    ])(
      "Should return correct chord for direction %s",
      (_, direction: Direction, expected: number[][]) => {
        const chords = board.getChords(direction);
        const actual = chords.map((chord) => chord.values());

        expect(actual).toEqual(expected);
      }
    );
  });
});
