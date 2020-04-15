import { mapToObj } from "./mapToObj";

test("Map to Object ", () => {
  const myMap = new Map([
    [1, "one"],
    [2, "two"],
    [3, "three"],
  ]);
  expect(mapToObj(myMap)).toEqual({
    1: "one",
    2: "two",
    3: "three",
  });
});
