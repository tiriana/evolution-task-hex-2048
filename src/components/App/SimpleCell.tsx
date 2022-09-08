import React from "react";
import { Cell } from "../../logic/GameLogic";

type SimpleCellProps = {
  cell: Cell;
};

const SimpleCell: React.FC<SimpleCellProps> = ({ cell }: SimpleCellProps) => {
  return (
    <div>
      [{cell.x}, {cell.y}, {cell.z}]: {cell.value}
    </div>
  );
};

export default SimpleCell;
