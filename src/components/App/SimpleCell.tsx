import React from "react";
import { Cell } from "../../logic/GameLogic";

import style from "./SimpleCell.module.scss";

function cube_to_oddq(hex: Cell) {
  var col = hex.q;
  var row = hex.r + (hex.q - (hex.q & 1)) / 2 + (hex.q & 1) / 2;

  return [col, row];
}

type SimpleCellProps = {
  cell: Cell;
};

const SimpleCell: React.FC<SimpleCellProps> = ({ cell }: SimpleCellProps) => {
  return (
    <div
      className={style.hexagon}
      style={{
        position: "absolute",
        left: 300 + cube_to_oddq(cell)[0] * 100 + "px",
        top: 300 + cube_to_oddq(cell)[1] * 100 + "px",
      }}
    >
      {/* {[...cell.position].join(",")} */}
      {cell.value}
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
