import React from "react";
import { Board as BoardLogic, Cell } from "../../logic/GameLogic";
import SimpleCell from "./SimpleCell";

import style from "./SimpleBoard.module.scss";
import cellStyle from "./SimpleCell.module.scss";

type SimpleBoardProps = {
  board: BoardLogic;
};

const SimpleBoard: React.FC<SimpleBoardProps> = ({
  board,
}: SimpleBoardProps) => {
  const cellsInCol = 2 * board.radius + 1;
  const size = parseInt(cellStyle.cellSize, 10);
  const top = ((2 / 20) * (board.radius + 1) + 2 / 3) * size; // decided by trial and error
  const left = (-0.25 * (board.radius + 1) + 1.3) * size;

  return (
    <div
      className={style.board}
      style={{
        transform: `scale(${3 / cellsInCol})`,
        top: top + "px",
        left: left + "px",
      }}
    >
      <div>
        {board.cells.map((cell: Cell) => {
          return <SimpleCell key={[...cell.position].join(",")} cell={cell} />;
        })}
      </div>
    </div>
  );
};

export default SimpleBoard;
