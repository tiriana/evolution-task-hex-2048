import Direction from "./Direction";
import Cell from "./Cell";
import { OutOfTheBoard } from "./OutOfTheBoard";
import CellsLine from "./CellsLine";
import Vector3 from "./Vector3";
import { shift } from "./utils";

// coordinates
// x (q) - top - bottom
// y (s) - top right - left bottom
// z (r) - top left - right bottom
//  ___
// / x \
// \y_z/

class Edge extends CellsLine {}
class Chord extends CellsLine {}

export default class Board {
  radius: number;
  ringsNum: number;
  cells: Cell[];
  cube: Map<number, Map<number, Map<number, Cell>>> = new Map();

  diagonals: Map<Direction, Chord[]> = new Map<Direction, Chord[]>();
  edges: Map<Direction, Edge> = new Map<Direction, Edge>();

  private howManyCells: number;

  constructor(radiusIncludingCenter: number = 2) {
    this.radius = radiusIncludingCenter;
    this.ringsNum = this.radius - 1;
    this.howManyCells = 1 + 3 * this.ringsNum * (this.ringsNum + 1);
    this.cells = new Array(this.howManyCells);

    this.buildCells();
  }

  getEmptyCells(): Cell[] {
    return this.cells.filter((cell: Cell) => cell.isEmpty());
  }

  getCell(x: number, y: number, z: number): Cell {
    const cell: Cell | undefined = this.cube.get(x)?.get(y)?.get(z);
    if (!cell) throw new OutOfTheBoard(this, x, y, z);
    return cell;
  }

  hasCell(x: number, y: number, z: number): boolean {
    return !!this.cube.get(x)?.get(y)?.get(z);
  }

  hasMove() {
    for (let i = 0; i < this.cells.length; i++) {
      const cell: Cell = this.cells[i];
      if (cell.isEmpty()) return true;

      // check if has a neighbour with the same value
      for (let j = 0; j < Direction.ALL_CLOCKWISE.length; j++) {
        const neighbourDirection: Direction = Direction.ALL_CLOCKWISE[j];
        const x: number = cell.x + neighbourDirection.x;
        const y: number = cell.y + neighbourDirection.y;
        const z: number = cell.z + neighbourDirection.z;

        if (!this.hasCell(x, y, z)) {
          continue; // there's no cell in neighbourDirection Direction
        }

        const neighbour: Cell = this.getCell(x, y, z);

        if (cell.value === neighbour.value) {
          return true;
        }
      }
    }
    return false; // GAME OVER
  }

  fromValues(values: number[]): this {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].value = values[i];
    }
    return this;
  }

  makeMove(direction: Direction): this {
    const chords: Chord[] = this.getChords(direction);

    chords.forEach((chord: Chord) => {
      chord.fromValues(shift(chord.values()));
    });

    return this;
  }

  getEdge(direction: Direction): Edge {
    if (!this.edges.has(direction)) {
      const nextDirection: Direction = direction.next();
      const vertex1: Cell = this.getCell(
        direction.x * this.radius,
        direction.y * this.radius,
        direction.z * this.radius
      );

      const vertex2: Cell = this.getCell(
        nextDirection.x * this.radius,
        nextDirection.y * this.radius,
        nextDirection.z * this.radius
      );

      this.edges.set(direction, new Edge(this, vertex1, vertex2));
    }
    return this.edges.get(direction) as Edge;
  }

  /**
   * Retunrs all chords (or lanes) in direction.
   * For exempls - for UP it returns all 'vertical' chords, ordered from bottom to up.
   * @param direction
   * @returns
   */
  getChords(direction: Direction): Chord[] {
    if (!this.diagonals.has(direction)) {
      const finalCells: Cell[] = [
        ...this.getEdge(direction.prev()).cells,
        ...this.getEdge(direction).cells.slice(1), // first cell is the same as prev edge's last cell, so it's duplicated, so I remove it
      ];

      const startingCells: Cell[] = [
        ...this.getEdge(direction.next().next()).cells,
        ...this.getEdge(direction.next().next().next()).cells.slice(1),
      ];

      const chords: Chord[] = new Array(finalCells.length);

      for (let i = 0; i < chords.length; i++) {
        const start = startingCells[i];
        const end = finalCells[finalCells.length - 1 - i];

        chords[i] = new Chord(this, start, end);
      }

      this.diagonals.set(direction, chords);
    }
    return this.diagonals.get(direction) as Chord[];
  }

  private buildCells(): void {
    let cellsCount = 0;
    for (let x = -this.radius; x <= this.radius; x++) {
      const minY = Math.max(-this.radius, -x - this.radius);
      const maxY = Math.min(this.radius, -x + this.radius);

      for (let y = minY; y <= maxY; y++) {
        this.addCell(new Cell(x, y, -x - y, this), cellsCount++);
      }
    }
  }

  private addCell(cell: Cell, position: number): void {
    this.cells[position] = cell;

    if (!this.cube.has(cell.x)) {
      this.cube.set(cell.x, new Map<number, Map<number, Cell>>());
    }

    const xLayer = this.cube.get(cell.x);

    if (!xLayer?.has(cell.y)) {
      xLayer?.set(cell.y, new Map<number, Cell>());
    }

    const yLayer = xLayer?.get(cell.y);

    yLayer?.set(cell.z, cell);
  }
}
