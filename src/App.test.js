import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";
import Home from "./containers/Home";

configure({ adapter: new Adapter() });

describe("App testing", () => {
  it("renders only one Home component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Home).length).toBe(1);
  });
});
