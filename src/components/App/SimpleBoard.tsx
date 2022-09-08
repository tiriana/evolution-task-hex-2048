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
    <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
      <Layout
        size={{ x: 10, y: 10 }}
        flat={true}
        spacing={1.1}
        origin={{ x: 0, y: 0 }}
      >
        {board.cells.map((cell: Cell) => {
          return <SimpleCell key={cell.position.toString()} cell={cell} />;
        })}
      </Layout>
    </HexGrid>
  );
};

export default SimpleBoard;
