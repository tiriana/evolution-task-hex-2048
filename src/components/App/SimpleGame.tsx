import React from "react";
import { Board as BoardLogic } from "../../logic/GameLogic";
import SimpleBoard from "./SimpleBoard";
import KeyboardEventHandler from "@infinium/react-keyboard-event-handler";

import { useState, useEffect, useReducer } from "react";

export const SimpleGame: React.FC = () => {
  const [board, setBoard] = useState(new BoardLogic(5));
  // const [move, setMove] = useState(new BoardLogic(2));

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(1);

  //     const cell = board.cells[Math.floor(Math.random() * board.cells.length)];
  //     cell.value = cell.value === 0 ? 2 : cell.value * 2;

  //     setBoard(board);

  //     forceUpdate();
  //   }, 1000);
  // }, [board]);

  // set some cells for test
  board.getCell(0, 0, 0).value = 2;
  board.getCell(-2, 0, 2).value = 4;
  board.getCell(1, 1, -2).value = 2;

  return (
    <>
      <KeyboardEventHandler
        handleKeys={["q", "w", "e", "a", "s", "d"]}
        onKeyEvent={(key, e) => {
          console.log(key);
          const cell =
            board.cells[Math.floor(Math.random() * board.cells.length)];
          cell.value = cell.value === 0 ? 2 : cell.value * 2;
          setBoard(board);
          forceUpdate();
        }}
      />
      <SimpleBoard board={board} />
    </>
  );
};
