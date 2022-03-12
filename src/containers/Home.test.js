/**
 * @jest-environment jsdom
 */
import { configure, mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Home from "./Home";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";
import { Alert, PageItem } from "react-bootstrap";

configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe("Home Component testing", () => {
  let store = mockStore({
    files: { data: [{ file: "fake.csv", lines: [] }] },
  });
  let wrapper = null;
  const mountWrapper = (mockedStore = null) => {
    wrapper = mount(
      <Provider store={mockedStore ? mockedStore : store}>
        <Home />
      </Provider>
    );
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ file: "fake.csv", lines: [] }]),
      })
    );
  });

  it("renders component correctly", async () => {
    mountWrapper();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    wrapper.update();
    expect(wrapper).not.toBeNull();
  });

  it("should render Alert: 'No results were found.'", async () => {
    mountWrapper();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    wrapper.update();
    expect(wrapper.find(Alert).length).toBe(1);
    expect(
      wrapper.find(Alert).at(0).contains("No results were found.")
    ).toBeTruthy();
  });

  it("should render Alert: 'Something went wrong. Try again later.' when api fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error("Service is not available")),
      })
    );

    mountWrapper();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    wrapper.update();
    expect(wrapper.find(Alert).length).toBe(1);
    expect(
      wrapper
        .find(Alert)
        .at(0)
        .contains("Something went wrong. Try again later.")
    ).toBeTruthy();
  });

  it("on change input search", async () => {
    mountWrapper();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    wrapper.update();

    expect(wrapper.find("input").length).toBe(1);
    wrapper.find("input").simulate("change", { target: { value: "fake.csv" } });
    expect(global.fetch).toBeCalled();
  });

  it("on click paginator, should show the correct file name", async () => {
    const fileName = "spiderman.csv";
    const fakeData = [
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
        file: fileName,
        lines: [],
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData),
      })
    );
    let customMockedStore = mockStore({
      files: { data: fakeData },
    });

    mountWrapper(customMockedStore);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    wrapper.update();

    expect(wrapper.find(PageItem).length).toBe(3);

    act(() => {
      wrapper.find(PageItem).at(2).prop("onClick")();
    });
    wrapper.update();

    expect(
      wrapper.find("#file-name").at(0).contains(`File Name: ${fileName}`)
    ).toBeTruthy();
  });
});
