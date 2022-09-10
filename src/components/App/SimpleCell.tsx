import React from "react";
import { Cell } from "../../logic/GameLogic";

import style from "./SimpleCell.module.scss";

import classNames from "classnames";
import { env } from "process";

function cube_to_oddq(hex: Cell) {
  var col = hex.q;
  var row = hex.r + (hex.q - (hex.q & 1)) / 2 + (hex.q & 1) / 2;

  return [col, -row]; // negative row because somehow I'm getting it flipped against horizontal symmetry line. Math is hard...
}

type SimpleCellProps = {
  cell: Cell;
};

const SimpleCell: React.FC<SimpleCellProps> = ({ cell }: SimpleCellProps) => {
  const size = parseInt(style.cellSize, 10);

  return (
    <div
      data-value={0 | cell.value}
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

      {env.debug && (
        <div className={style.coords}>
          <span className={style.coord_X}>{cell.x}</span>
          <span className={style.coord_Y}>{cell.y}</span>
          <span className={style.coord_Z}>{cell.z}</span>
        </div>
      )}
    </div>
  );
};

export default SimpleCell;
