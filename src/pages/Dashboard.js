import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeToken } from "./reducers/Slicer";
import { useDispatch } from "react-redux";
import "./Dashboard.css";
import "../App.css";
import CreatePlaylist from "./CreatePlaylist";
import MyPlaylist from "./myPlaylist";
import Auth from "./login/App";
import AddSong from "./Addsong";
import Search from "../components/Search";
import Home from "./Home";

function Dashboard() {
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
                <svg
                  className="svg-side"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
                <p>Home</p>
              </div>
            </NavLink>
            <NavLink to="/search">
              <div className="menu-box">
                <svg
                  className="svg-side"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <p>Search</p>
              </div>
            </NavLink>
            <NavLink to="/myplaylist">
              <div className="menu-box">
                <svg
                  className="svg-side"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <p>My Playlist</p>
              </div>
            </NavLink>
            <NavLink to="/create-playlist">
              <div className="menu-box">
                <svg
                  className="svg-side"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <p>Create Playlist</p>
              </div>
            </NavLink>
            <NavLink className="logout" to="/">
              <svg
                className="svg-side"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <p onClick={() => dispatch(removeToken())}>Log out</p>
            </NavLink>
          </div>
          <div className="main-container">
            <Routes>
              <Route path="/dashboard" element={<Home />} />
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

export default Dashboard;
