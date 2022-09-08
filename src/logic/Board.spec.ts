import Board from "./Board";
import Cell from "./Cell";
import Direction from "./Direction";

describe("game board", () => {
  //   test("should have cells", () => {
  //     console.log(new Board(2).cube);
  //   });

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
});
