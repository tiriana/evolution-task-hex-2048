import React from "react";

import { useState } from "react";
import { GameConfig } from "./GameConfig";
import SimpleBoard from "./SimpleBoard";
import { MoveListener } from "./MoveListener";
import { GameStateBadge } from "./GameStateBadge";

import Direction from "../../logic/Direction";
import Cell from "../../logic/Cell";

import { default as BoardLogic } from "../../logic/Board";
import { GetData } from "./GetData";
import { RngServerResponse } from "./RngServerResponse";
import { HexSimple } from "./HexSimple";
import { RngServerRequest } from "./RngServerRequest";

import env from "./env";

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

declare global {
  interface Window {
    bag: any;
  }
}

const GameController: React.FC<GameConfig> = ({ hostname, port, radius }) => {
  const [waitingForData, setWaitingForData] = useState(true);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [response, setResponse] = useState([] as RngServerResponse);

  const [board, setBoard] = useState(new BoardLogic(radius - 1));

  window.bag = {
    board,
    Direction,
  };

  window.bag = {
    board,
    Direction,
  };

  const onMove = (dir: Direction) => {
    const before = board.values().join();
    board.makeMove(dir);
    const after = board.values().join();

    if (before !== after) {
      setBoard(board);
      setWaitingForInput(false);
      setWaitingForData(true);
    }
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
    <pre
      style={{
        position: "fixed",
        right: 0,
      }}
    >
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
    <div className={"mainContainer"}>
      {waitingForData && (
        <GetData
          {...{ hostname, port, radius }}
          onReceived={onReceived}
          request={boardToRequest(board)}
        />
      )}
      {waitingForInput && board.hasMove() && <MoveListener onMove={onMove} />}

      {env.debug && debug}

      <SimpleBoard board={board} />
      <GameStateBadge hasMove={board.hasMove()} />
    </div>
  );
};

export default GameController;
