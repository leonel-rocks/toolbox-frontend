import filesReducer from "./files";

describe("Testing files reducer", () => {
  it("should return current state", () => {
    const currentState = filesReducer(undefined, {});
    expect(currentState).toEqual({ data: null });
  });
  it("should return new state when UPDATE_FILES action type is called", () => {
    const data = [
      {
        file: "fake.csv",
        lines: [
          {
            file: "fake.csv",
            text: "XnzfZghNL",
            number: "968718",
            hex: "981ed6feb175d38fc1cb533dd5100dab",
          },
          {
            file: "fake.csv",
            text: "UnjuWOvBz",
            number: "852096",
            hex: "6111588a195c2802bd332b57004251cd",
          },
          {
            file: "fake.csv",
            text: "cNyNfTHviwzYSmNKZe",
            number: "1487333",
            hex: "aadc99ee935ab4050a37df51b3198ab4",
          },
        ],
      },
      {
        file: "mickeymouse.csv",
        lines: [
          {
            file: "mickeymouse.csv",
            text: "XnzfZghNL",
            number: "968718",
            hex: "981ed6feb175d38fc1cb533dd5100dab",
          },
        ],
      },
      {
        file: "spiderman.csv",
        lines: [],
      },
    ];

    const newState = filesReducer(undefined, {
      type: "UPDATE_FILES",
      data,
    });

    expect(newState).toEqual({ data });
  });
});
