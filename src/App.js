import "./App.css";
import { useDispatch } from "react-redux";
import { setToken } from "./pages/reducers/Slicer";

function App() {
  const dispatch = useDispatch();

  let accessToken = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1];

  if (accessToken) {
    dispatch(setToken(accessToken));
  }

  // const validToken = () => {
  //   if (accessToken) {
  //     return true;
  //   }
  // };
  return <div className="wrapper"></div>;
}

export default App;
