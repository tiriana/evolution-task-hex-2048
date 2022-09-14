import React from "react";
import renderer from "react-test-renderer";
import { GameStateBadge } from "./GameStateBadge";

it.each([true, false])("renders game-state", (hasMoves) => {
  const component = renderer.create(<GameStateBadge hasMove={hasMoves} />);

  expect(component.toJSON()).toMatchSnapshot();
});
