export default class Vector3<T> implements Iterable<T> {
  protected _x: T;
  protected _y: T;
  protected _z: T;

  readonly [index: number]: T;

  constructor(x: T, y: T, z: T) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get [0]() {
    return this._x;
  }
  get [1]() {
    return this._y;
  }
  get [2]() {
    return this._z;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }

  [Symbol.iterator](): Iterator<T> {
    let n: number = 0;
    const arr = this;
    return {
      next() {
        return {
          value: arr[n],
          done: 3 < n++,
        };
      },
    };
  }
}
