import { createKey } from "./index";

describe("Testing utils", () => {
  it("should return a key when input exists", () => {
    const fakeInput = "I am IRON MAN from earth_161";
    expect(createKey(fakeInput)).toBe("i_am_iron_man_from_earth_161");
  });

  it("should return no_key when input does not exist", () => {
    expect(createKey(undefined)).toBe("no_key");
  });
});
