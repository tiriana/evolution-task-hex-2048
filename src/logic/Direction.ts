import Vector3 from "./Vector3";

export default class Direction extends Vector3<-1 | 0 | 1> {
  static readonly UP: Direction = new Direction(0, 1, -1);
  static readonly DOWN: Direction = new Direction(0, -1, 1);
  static readonly LEFT_UP: Direction = new Direction(-1, 1, 0);
  static readonly RIGHT_DOWN: Direction = new Direction(1, -1, 0);
  static readonly RIGHT_UP: Direction = new Direction(1, 0, -1);
  static readonly LEFT_DOWN: Direction = new Direction(-1, 0, 1);
  static readonly ALL_CLOCKWISE: Direction[] = [
    Direction.UP,
    Direction.RIGHT_UP,
    Direction.RIGHT_DOWN,
    Direction.DOWN,
    Direction.LEFT_DOWN,
    Direction.LEFT_UP,
  ];
}
