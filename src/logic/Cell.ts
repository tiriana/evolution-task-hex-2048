import Vector3 from "./Vector3";

class CellPosition extends Vector3<number> {}

export class Cell {
  position: CellPosition;
  value: number = 0;

  constructor(x: number, y: number, z: number) {
    this.position = new CellPosition(x, y, z);
  }

  get isEmpty(): boolean {
    return this.value === 0;
  }

  get x(): number {
    return this.position.x;
  }

  get y(): number {
    return this.position.y;
  }

  get z(): number {
    return this.position.z;
  }
}
