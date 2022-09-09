import React from "react";
import { Cell } from "../../logic/GameLogic";

import style from "./SimpleCell.module.scss";

import classNames from "classnames";

function cube_to_oddq(hex: Cell) {
  var col = hex.q;
  var row = hex.r + (hex.q - (hex.q & 1)) / 2 + (hex.q & 1) / 2;

  return [col, row];
}

type SimpleCellProps = {
  cell: Cell;
};

const SimpleCell: React.FC<SimpleCellProps> = ({ cell }: SimpleCellProps) => {
  const size = parseInt(style.cellSize, 10);
  const top = 0; //20 + cell.board.radius * size;
  const left = 0; // 200 + cell.board.radius * size;

  return (
    <div
      data-value={cell.value}
      data-x={cell.x}
      data-y={cell.y}
      data-z={cell.z}
      className={style.cell}
      style={{
        left: cube_to_oddq(cell)[0] * 0.72 * size + "px",
        top: cube_to_oddq(cell)[1] * 0.82 * size + "px",
      }}
    >
      <div
        className={classNames(
          style.inner,
          style[`value--` + Math.min(cell.value, 2049)]
        )}
      >
        {cell.value ? cell.value : ""}
      </div>

      {/* <span className={style.coord_X}>{cell.x}</span>
      <span className={style.coord_Y}>{cell.y}</span>
      <span className={style.coord_Z}>{cell.z}</span> */}
    </div>
  );
};

export default SimpleCell;
