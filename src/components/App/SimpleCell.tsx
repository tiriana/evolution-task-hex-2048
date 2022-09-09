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
  const size = 100;
  const top = 20 + cell.board.radius * size;
  const left = 200 + cell.board.radius * size;

  return (
    <div
      data-value={cell.value}
      data-x={cell.x}
      data-y={cell.y}
      data-z={cell.z}
      className={classNames(style.cell, style[`cell--` + cell.value])}
      style={{
        left: left + cube_to_oddq(cell)[0] * 0.72 * size + "px",
        top: top + cube_to_oddq(cell)[1] * 0.82 * size + "px",

        width: size + "px",
        height: size + "px",
      }}
    >
      {cell.value ? cell.value : ""}
      <span className={style.coord_X}>{cell.x}</span>
      <span className={style.coord_Y}>{cell.y}</span>
      <span className={style.coord_Z}>{cell.z}</span>
    </div>
  );
};

export default SimpleCell;
