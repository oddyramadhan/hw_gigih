import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Tracks from "./Tracks";
import store from "../../redux/store";

test("render tracks component", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Tracks />
      </BrowserRouter>
    </Provider>
  );
});
