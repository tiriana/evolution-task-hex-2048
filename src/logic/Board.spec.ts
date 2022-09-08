import Board from "./Board";
import Cell from "./Cell";
import Direction from "./Direction";

describe("game board", () => {
  describe("getEdge", () => {
    let board: Board;

    beforeAll(() => {
      board = new Board(3);
      board.cells.forEach(
        (cell: Cell) => (cell.value = 100 * cell.x + 10 * cell.y + cell.z)
      );
    });

    test.each([
      ["UP", Direction.UP, [27, 117, 207, 297]],
      ["RIGHT_UP", Direction.RIGHT_UP, [297, 288, 279, 270]],
      ["RIGHT_DOWN", Direction.RIGHT_DOWN, [270, 171, 72, -27]],
      ["DOWN", Direction.DOWN, [-27, -117, -207, -297]],
      ["LEFT_DOWN", Direction.LEFT_DOWN, [-297, -288, -279, -270]],
      ["LEFT_UP", Direction.LEFT_UP, [-270, -171, -72, 27]],
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
      board.cells.forEach(
        (cell: Cell) => (cell.value = 100 * cell.x + 10 * cell.y + cell.z)
      );
    });

    test.each([
      [
        "UP",
        Direction.UP,
        [
          [90, 99],
          [-9, 0, 9],
          [-99, -90],
        ],
      ],
      [
        "RIGHT_UP",
        Direction.RIGHT_UP,
        [
          [-9, 90],
          [-99, 0, 99],
          [-90, 9],
        ],
      ],
      [
        "RIGHT_DOWN",
        Direction.RIGHT_DOWN,
        [
          [-99, -9],
          [-90, 0, 90],
          [9, 99],
        ],
      ],
      [
        "DOWN",
        Direction.DOWN,
        [
          [-90, -99],
          [9, 0, -9],
          [99, 90],
        ],
      ],
      [
        "LEFT_DOWN",
        Direction.LEFT_DOWN,
        [
          [9, -90],
          [99, 0, -99],
          [90, -9],
        ],
      ],
      [
        "LEFT_UP",
        Direction.LEFT_UP,
        [
          [99, 9],
          [90, 0, -90],
          [-9, -99],
        ],
      ],
    ])(
      "Should return correct edge for direction %s",
      (_, direction: Direction, expected: number[][]) => {
        const chords = board.getChords(direction);
        const actual = chords.map((chord) => chord.values());

        expect(actual).toEqual(expected);
      }
    );
  });
});
