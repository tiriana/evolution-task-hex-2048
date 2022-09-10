import { render } from "@testing-library/react"; // cleanup is automatic
import { ConfigReader } from "./ConfigReader";

describe("ConfigReader", () => {
  it("reads parameters from search params", () => {
    const mocked: { [key: string]: string | number } = {
      hostname:
        "jest-już-bardzo-późno-i-jestem-zmęczony-a-to-zadanie-jest-bardzo-długie",
      port: 80,
      radius: 123,
    };

    jest
      .spyOn(URLSearchParams.prototype, "get")
      .mockImplementation((key: string) => String(mocked[key]));

    const Component = jest.fn(() => <h1>LA LA</h1>);

    render(<ConfigReader GameController={Component} />);

    expect(Component).toHaveBeenCalledWith(mocked, expect.anything());
  });
});
