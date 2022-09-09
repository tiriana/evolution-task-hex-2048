import React from "react";

type GameStateProps = {
  hasMove: boolean;
};
export const GameStateBadge: React.FC<GameStateProps> = ({ hasMove }) => {
  const status = hasMove ? "playing" : "game-over";
  return <div data-status={status}>Game status: {status}</div>;
};
