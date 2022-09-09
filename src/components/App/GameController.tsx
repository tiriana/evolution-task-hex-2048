import React from "react";

import { useState } from "react";
import { GameConfig } from "./GameConfig";
import SimpleBoard from "./SimpleBoard";
import { MoveListener } from "./MoveListener";
import { GameStateBadge } from "./GameStateBadge";

import Direction from "../../logic/Direction";
import Cell from "../../logic/Cell";

import { useReducer } from "react";

import { default as BoardLogic } from "../../logic/Board";
import { GetData } from "./GetData";
import { RngServerResponse } from "./RngServerResponse";
import { HexSimple } from "./HexSimple";
import { RngServerRequest } from "./RngServerRequest";

const cellToSimpleHex: (cell: Cell) => HexSimple = (cell: Cell) => {
  return {
    x: cell.x,
    y: cell.y,
    z: cell.z,
    value: 0 | cell.value,
  };
};

const boardToRequest: (board: BoardLogic) => RngServerRequest = (
  board: BoardLogic
) => {
  const request: RngServerRequest = [];

  board.cells.forEach((cell: Cell) => {
    cell.value && request.push(cellToSimpleHex(cell));
  });

  return request;
};

const GameController: React.FC<GameConfig> = ({ hostname, port, radius }) => {
  const [waitingForData, setWaitingForData] = useState(true);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [response, setResponse] = useState([] as RngServerResponse);

  const [board, setBoard] = useState(new BoardLogic(radius - 1));

  // const [, forceUpdate] = useReducer((x) => x + 1, 0);

  window.bag = {
    board,
    Direction,
  };

  const onMove = (dir: Direction) => {
    setWaitingForInput(false);

    board.makeMove(dir);
    setBoard(board);

    setWaitingForData(true);
  };

  const onReceived = (response: RngServerResponse) => {
    setWaitingForData(false);

    response.forEach(({ x, y, z, value }: HexSimple) => {
      board.getCell(x, y, z).value = value;
    });

    setResponse(response);

    setWaitingForInput(true);
  };

  const debug = (
    <pre>
      {JSON.stringify(
        {
          hostname,
          port,
          radius,
          response,
          waitingForData,
          waitingForInput,
        },
        null,
        2
      )}
    </pre>
  );

  return (
    <>
      {waitingForData && (
        <GetData
          {...{ hostname, port, radius }}
          onReceived={onReceived}
          request={boardToRequest(board)}
        />
      )}
      {waitingForInput && board.hasMove() && <MoveListener onMove={onMove} />}

      {debug}

      <GameStateBadge hasMove={board.hasMove()} />

      <SimpleBoard board={board} />
    </>
  );
};

export default GameController;
