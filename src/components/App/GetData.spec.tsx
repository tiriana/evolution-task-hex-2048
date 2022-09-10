import axios from "axios";
import { render } from "@testing-library/react"; // cleanup is automatic
import { GetData } from "./GetData";
import { RngServerRequest } from "./RngServerRequest";
jest.mock("axios");

const tick = async () => new Promise((r) => setImmediate(r));

it("Gets the data", async () => {
  const onReceived = jest.fn();
  const response = [1, 2, 3];

  const hostname = "example.com";
  const port = 80;
  const radius = 20;
  const request: RngServerRequest = [];

  axios.post.mockResolvedValue({ data: response });

  const url = `//${hostname}:${port}/${radius}`;

  render(
    <GetData
      onReceived={onReceived}
      hostname="hostname"
      port={123}
      radius={2}
      request={request}
    />
  );

  expect(onReceived).not.toHaveBeenCalled();

  await tick(); // a trick to wait for the next event loop

  expect(onReceived).toHaveBeenCalledWith(response);
});
