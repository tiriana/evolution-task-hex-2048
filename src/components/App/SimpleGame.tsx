import React from "react";
import { default as BoardLogic } from "../../logic/Board";
import Direction from "../../logic/Direction";
import SimpleBoard from "./SimpleBoard";
import KeyboardEventHandler from "@infinium/react-keyboard-event-handler";

import { useState, useEffect, useReducer } from "react";

type MoveListenerProps = {
  onMove: (dir: Direction) => unknown;
};
const MoveListener: React.FC<MoveListenerProps> = ({ onMove }) => {
  const directionsMap: { [key: string]: Direction } = {
    d: Direction.LEFT_UP,
    s: Direction.UP,
    a: Direction.RIGHT_UP,
    q: Direction.RIGHT_DOWN,
    w: Direction.DOWN,
    e: Direction.LEFT_DOWN,
  };
  return (
    <KeyboardEventHandler
      handleKeys={["q", "w", "e", "a", "s", "d"]}
      onKeyEvent={(key, e) => onMove(directionsMap[key])}
    />
  );
};

export const SimpleGame: React.FC = () => {
  const [board, setBoard] = useState(new BoardLogic(2));

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // set some cells for test
  board.getCell(0, 0, 0).value = 2;
  board.getCell(-2, 0, 2).value = 4;
  board.getCell(1, 1, -2).value = 2;

  const onMove = (dir: Direction) => {
    board.makeMove(dir);
    setBoard(board);
    forceUpdate();
  };

  return (
    <>
      <MoveListener onMove={onMove} />
      <SimpleBoard board={board} />
    </>
  );
};
