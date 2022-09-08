import React from "react";
import { Board as BoardLogic, Cell } from "../../logic/GameLogic";
import SimpleCell from "./SimpleCell";

type SimpleBoardProps = {
  board: BoardLogic;
};

const SimpleBoard: React.FC<SimpleBoardProps> = ({
  board,
}: SimpleBoardProps) => {
  return (
    <div>
      {board.cells.map((cell: Cell) => {
        return <SimpleCell cell={cell} />;
      })}
    </div>
  );
};

export default SimpleBoard;
