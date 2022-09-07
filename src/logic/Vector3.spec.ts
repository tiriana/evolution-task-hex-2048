import Vector3 from "./Vector3";

describe("Vector3", () => {
  test("should have coordinates access", () => {
    const vec3 = new Vector3<number>(1, 2, 3);

    expect(vec3.x).toEqual(1);
    expect(vec3.y).toEqual(2);
    expect(vec3.z).toEqual(3);
  });

  test("should have index access", () => {
    const vec3 = new Vector3<number>(1, 2, 3);

    expect(vec3[0]).toEqual(1);
    expect(vec3[1]).toEqual(2);
    expect(vec3[2]).toEqual(3);
  });

  test("should be destructurable", () => {
    const vec3 = new Vector3<number>(1, 2, 3);

    const [q, r, s] = vec3;

    expect(q).toEqual(1);
    expect(r).toEqual(2);
    expect(s).toEqual(3);
  });
});
