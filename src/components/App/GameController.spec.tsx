import React from "react";
import { render } from "@testing-library/react"; // cleanup is automatic
import GameController from "./GameController";
import axios from "axios";
import { act } from "react-dom/test-utils";
jest.mock("axios");
const tick = async () => new Promise((r) => setTimeout(r, 0));

it("renders the game", async () => {
  const [x, y, z, value] = [0, 1, -1, 128];
  const response = {
    data: [{ x, y, z, value }],
  };
  const responsePromise = new Promise((res) =>
    setTimeout(() => res(response), 1)
  );
  axios.post.mockReturnValueOnce(responsePromise);

  const { container } = render(
    <GameController hostname="hostname" port={13337} radius={2} />
  );

  expect(container.innerHTML).toMatchSnapshot();

  await act(tick);

  expect(
    container.querySelector(`[data-x="${x}"][data-y="${y}"][data-z="${z}"]`)
  ).toHaveAttribute("data-value", "" + value);

  expect(container.innerHTML).toMatchSnapshot();
});
