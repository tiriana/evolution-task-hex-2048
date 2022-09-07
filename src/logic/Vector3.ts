export default class Vector3<T> implements Iterable<T> {
  readonly x: T;
  readonly y: T;
  readonly z: T;

  [index: number]: T;

  constructor(x: T, y: T, z: T) {
    this.x = x;
    this.y = y;
    this.z = z;

    this[0] = this.x;
    this[1] = this.y;
    this[2] = this.z;
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
