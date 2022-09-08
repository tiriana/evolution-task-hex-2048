import React from "react";
import { Board as BoardLogic } from "../../logic/GameLogic";
import SimpleBoard from "./SimpleBoard";

export const SimpleGame: React.FC = () => {
  const board: BoardLogic = new BoardLogic(2);

  // set some cells for test
  board.getCell(0, 0, 0).value = 2;
  board.getCell(-2, 0, 2).value = 4;
  board.getCell(1, 1, -2).value = 2;

  return <SimpleBoard board={board} />;
};
