import React from "react";
import { Board as BoardLogic, Cell } from "../../logic/GameLogic";
import SimpleCell from "./SimpleCell";

import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Path,
  Hex,
} from "react-hexgrid";

type SimpleBoardProps = {
  board: BoardLogic;
};

const SimpleBoard: React.FC<SimpleBoardProps> = ({
  board,
}: SimpleBoardProps) => {
  return (
    <div
      style={{
        width: "500px",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "550px",
          width: "100%",
          border: "1px solid red",
        }}
      >
        {/* <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        <Layout
          size={{ x: 10, y: 10 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        > */}
        {board.cells.map((cell: Cell) => {
          return <SimpleCell key={[...cell.position].join(",")} cell={cell} />;
        })}
        {/* </Layout>
      </HexGrid> */}
      </div>
    </div>
  );
};

export default SimpleBoard;
