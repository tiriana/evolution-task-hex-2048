import Vector3 from "./Vector3";

type Directional = -1 | 0 | 1;

export default class Direction extends Vector3<Directional> {
  next(): Direction {
    return Direction.NEXT_CW.get(this) as Direction;
  }

  prev(): Direction {
    return Direction.NEXT_CCW.get(this) as Direction;
  }

  private constructor(x: Directional, y: Directional, z: Directional) {
    super(x, y, z);
  }

  static readonly UP: Direction = new Direction(0, -1, 1);
  static readonly DOWN: Direction = new Direction(0, 1, -1);
  static readonly LEFT_UP: Direction = new Direction(-1, 0, 1);
  static readonly RIGHT_DOWN: Direction = new Direction(1, 0, -1);
  static readonly RIGHT_UP: Direction = new Direction(1, -1, 0);
  static readonly LEFT_DOWN: Direction = new Direction(-1, 1, 0);
  static readonly ALL_CLOCKWISE: Direction[] = [
    Direction.UP,
    Direction.RIGHT_UP,
    Direction.RIGHT_DOWN,
    Direction.DOWN,
    Direction.LEFT_DOWN,
    Direction.LEFT_UP,
  ];

  /** cloclwise */
  private static readonly NEXT_CW: Map<Direction, Direction> = new Map([
    [Direction.UP, Direction.RIGHT_UP],
    [Direction.RIGHT_UP, Direction.RIGHT_DOWN],
    [Direction.RIGHT_DOWN, Direction.DOWN],
    [Direction.DOWN, Direction.LEFT_DOWN],
    [Direction.LEFT_DOWN, Direction.LEFT_UP],
    [Direction.LEFT_UP, Direction.UP],
  ]);

  /** counter cloclwise */
  private static readonly NEXT_CCW: Map<Direction, Direction> = new Map([
    [Direction.RIGHT_UP, Direction.UP],
    [Direction.RIGHT_DOWN, Direction.RIGHT_UP],
    [Direction.DOWN, Direction.RIGHT_DOWN],
    [Direction.LEFT_DOWN, Direction.DOWN],
    [Direction.LEFT_UP, Direction.LEFT_DOWN],
    [Direction.UP, Direction.LEFT_UP],
  ]);
}
