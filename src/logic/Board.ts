import Vector3 from "./Vector3";

// coordinates
// x (q) - top - bottom
// y (s) - top right - left bottom
// z (r) - top left - right bottom
//  ___
// / x \
// \y_z/

interface IList<T> {
  [index: number]: T;
}

class Direction extends Vector3<-1 | 0 | 1> {
  static readonly UP = new Direction(0, 1, -1);
  static readonly DOWN = new Direction(0, -1, 1);
  static readonly LEFT_UP = new Direction(-1, 1, 0);
  static readonly RIGHT_DOWN = new Direction(1, -1, 0);
  static readonly RIGHT_UP = new Direction(1, 0, -1);
  static readonly LEFT_DOWN = new Direction(-1, 0, 1);
}

class Board {
  radius: number = 0;
}
