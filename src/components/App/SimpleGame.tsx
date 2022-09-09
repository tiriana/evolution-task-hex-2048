import React from "react";
import { default as BoardLogic } from "../../logic/Board";
import Direction from "../../logic/Direction";
import Cell from "../../logic/Cell";
import SimpleBoard from "./SimpleBoard";

import { useState, useReducer } from "react";
import { MoveListener } from "./MoveListener";
import { GameStateBadge } from "./GameStateBadge";
import { range } from "../../logic/utils";

declare global {
  interface Window {
    bag: any;
  }
}
export const SimpleGame: React.FC = () => {
  const [board, setBoard] = useState(
    new BoardLogic(3).fromValues(range(1, 37))
  );

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  window.bag = {
    board,
    Direction,
  };

  const onMove = (dir: Direction) => {
    board.makeMove(dir);
    const cell: Cell | undefined = board.getEmptyCells().pop();
    if (cell) cell.value = Math.random() < 0.5 ? 2 : 4;

    setBoard(board);
    forceUpdate(); // my bad...
  };

  return (
    <>
      {board.hasMove() && <MoveListener onMove={onMove} />}
      <GameStateBadge hasMove={board.hasMove()} />
      <SimpleBoard board={board} />
    </>
  );
};
