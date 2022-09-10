import React from "react";
import Direction from "../../logic/Direction";
import KeyboardEventHandler from "@infinium/react-keyboard-event-handler";

type MoveListenerProps = {
  onMove: (dir: Direction) => unknown;
};
export const MoveListener: React.FC<MoveListenerProps> = ({ onMove }) => {
  const directionsMap: { [key: string]: Direction } = {
    q: Direction.LEFT_UP,
    w: Direction.UP,
    e: Direction.RIGHT_UP,
    d: Direction.RIGHT_DOWN,
    s: Direction.DOWN,
    a: Direction.LEFT_DOWN,
  };
  return (
    <KeyboardEventHandler
      handleEventType="keyup"
      handleKeys={["q", "w", "e", "a", "s", "d"]}
      onKeyEvent={(key, e) => onMove(directionsMap[key])}
    />
  );
};
