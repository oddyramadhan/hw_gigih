import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import Tracks from "./Tracks";
import store from "../reducers/store";
import userEvent from "@testing-library/user-event";

test("render tracks component", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Tracks />
      </BrowserRouter>
    </Provider>
  );
});

test("button click", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Tracks />
      </BrowserRouter>
    </Provider>
  );
  userEvent.click(screen.getByRole("button"));
});

test("get text", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Tracks />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText("Add Songs")).toBeInTheDocument();
});
