import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./login/App";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = useSelector((state) => state.token.token);
  const validToken = () => {
    if (token) {
      return true;
    }
  };

  return (
    <div className="wrapper">{validToken() ? <Dashboard /> : <Auth />})</div>
  );
}

export default App;
