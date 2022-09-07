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

class Direction extends Vector3<-1 | 0 | 1> {}

const UP = new Direction(0, 1, -1);
const DOWN = new Direction(0, -1, 1);
const LEFT_UP = new Direction(-1, 1, 0);
const RIGHT_DOWN = new Direction(1, -1, 0);
const RIGHT_UP = new Direction(1, 0, -1);
const LEFT_DOWN = new Direction(-1, 0, 1);

class Board {
  radius: number = 0;
}
