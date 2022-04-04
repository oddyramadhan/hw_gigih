import "./App.css";
import Albums from "./components/Albums";
import { Route, Routes } from "react-router-dom";
import WebApp from "./pages/implicit_grant/App";
import CreatePlaylist from "./pages/CreatePlaylist";

function Playlist() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<WebApp />} />
        <Route path="/dashboard" element={<Albums />} />
        <Route path="/createplaylist" element={<CreatePlaylist />} />
      </Routes>
    </div>
  );
}
export default Playlist;
