import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeToken } from "./reducers/Slicer";
import { useDispatch } from "react-redux";
import "./Home.css";
import CreatePlaylist from "./CreatePlaylist";
import MyPlaylist from "./myPlaylist";
import Auth from "./login/App";
import AddSong from "./Addsong";
import Search from "../components/Search";

function Home() {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const validToken = () => {
    if (token) {
      return true;
    }
  };

  return (
    <div className="wrapper">
      {validToken() ? (
        <div className="home">
          <div className="left-container">
            <NavLink to="/dashboard">
              <div className="menu-box">
                <p>Home</p>
              </div>
            </NavLink>
            <NavLink to="/search">
              <div className="menu-box">
                <p>Search</p>
              </div>
            </NavLink>
            <NavLink to="/myplaylist">
              <div className="menu-box">
                <p>My Playlist</p>
              </div>
            </NavLink>
            <NavLink to="/create-playlist">
              <div className="menu-box">
                <p>Create Playlist</p>
              </div>
            </NavLink>
            <div className="logout">
              <NavLink to="/">
                <p onClick={() => dispatch(removeToken())}>Log out</p>
              </NavLink>
            </div>
          </div>
          <div className="main-container">
            <Routes>
              {/* <Route path="/dashboard" element={<Home />} /> */}
              <Route path="/search" element={<Search />} />
              <Route path="/myplaylist" element={<MyPlaylist />} />
              <Route path="/create-playlist" element={<CreatePlaylist />} />
              <Route path="/add-song" element={<AddSong />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Auth />
      )}
      )
    </div>
  );
}

export default Home;
