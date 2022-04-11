import "./App.css";
import Albums from "./components/Albums";
import { Route, Routes, Navigate } from "react-router-dom";
import WebApp from "./pages/implicit_grant/App";
import CreatePlaylist from "./pages/CreatePlaylist";
import { useDispatch } from "react-redux";
import { setToken } from "./pages/reducers/Slicer";
import MyPlaylist from "./pages/myPlaylist";
import AddSong from "./pages/Addsong";

function App() {
  const dispatch = useDispatch();

  let accessToken = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1];

  if (accessToken) {
    dispatch(setToken(accessToken));
  }

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/login" element={<WebApp />} />
        <Route path="/dashboard" element={<Albums />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        <Route path="myplaylist" element={<MyPlaylist />} />
        <Route path="add-song" element={<AddSong />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
