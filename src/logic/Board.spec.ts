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
      ["UP", Direction.UP, [2, 5]],
      ["RIGHT_UP", Direction.RIGHT_UP, [5, 6]],
      ["RIGHT_DOWN", Direction.RIGHT_DOWN, [6, 4]],
      ["DOWN", Direction.DOWN, [4, 1]],
      ["LEFT_DOWN", Direction.LEFT_DOWN, [1, 0]],
      ["LEFT_UP", Direction.LEFT_UP, [0, 2]],
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
          [6, 5],
          [4, 3, 2],
          [1, 0],
        ],
      ],
      [
        "RIGHT_UP",
        Direction.RIGHT_UP,
        [
          [4, 6],
          [1, 3, 5],
          [0, 2],
        ],
      ],
      [
        "RIGHT_DOWN",
        Direction.RIGHT_DOWN,
        [
          [1, 4],
          [0, 3, 6],
          [2, 5],
        ],
      ],
      [
        "DOWN",
        Direction.DOWN,
        [
          [0, 1],
          [2, 3, 4],
          [5, 6],
        ],
      ],
      [
        "LEFT_DOWN",
        Direction.LEFT_DOWN,
        [
          [2, 0],
          [5, 3, 1],
          [6, 4],
        ],
      ],
      [
        "LEFT_UP",
        Direction.LEFT_UP,
        [
          [5, 2],
          [6, 3, 0],
          [4, 1],
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
