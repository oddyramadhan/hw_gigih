import "./App.css";
import { Provider } from "react-redux";
// import { setToken } from "./pages/reducers/Slicer";
import Home from "./pages/Dashboard";
import store from "./pages/reducers/store";

function App() {
  <Provider store={store}>
    <Home />
  </Provider>;
}
export default App;
