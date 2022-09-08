import React from "react";
import { Cell } from "../../logic/GameLogic";

import { Hexagon, Text, Pattern, Path, Hex } from "react-hexgrid";

import style from "./SimpleCell.module.scss";

type SimpleCellProps = {
  cell: Cell;
};

const SimpleCell: React.FC<SimpleCellProps> = ({ cell }: SimpleCellProps) => {
  return (
    // <div>
    //   [{cell.x}, {cell.y}, {cell.z}]: {cell.value}
    // </div>
    <Hexagon
      key={cell.position.toString()}
      className={[style.cell, style[`tile${cell.value}`]].join(" ")}
      data={cell.position}
      q={cell.x}
      r={cell.y}
      s={cell.z}
      fill="black"
    >
      <Text className={style.text}>{cell.value}</Text>
    </Hexagon>
  );
};

export default SimpleCell;
