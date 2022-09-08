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
  const size = 200 / cell.board.radius;
  const top = cell.board.radius * size;
  const left = cell.board.radius * size;

  return (
    <div
      className={classNames(style.cell, style[`cell--` + cell.value])}
      style={{
        left: top + cube_to_oddq(cell)[0] * 0.72 * size + "px",
        top: left + cube_to_oddq(cell)[1] * 0.82 * size + "px",

        width: size + "px",
        height: size + "px",
      }}
    >
      {/* {[...cell.position].join(",")} */}
      {cell.value ? cell.value : ""}
      {/* <span className={style.coord_X}>{cell.x}</span>
      <span className={style.coord_Y}>{cell.y}</span>
      <span className={style.coord_Z}>{cell.z}</span> */}
    </div>
    // <Hexagon
    //   key={cell.position.toString()}
    //   className={[style.cell, style[`tile${cell.value}`]].join(" ")}
    //   data={cell.position}
    //   q={cell.x}
    //   r={cell.y}
    //   s={cell.z}
    //   fill="black"
    // >
    //   <Text className={style.text}>{cell.value}</Text>
    // </Hexagon>
  );
};

export default SimpleCell;
