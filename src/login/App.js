import React from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setToken } from "../reducers/Slicer";

const CLIENT_ID = "d8aaffad66dc46989595aa50b3414ea2"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = process.env.REACT_APP_URL;
const SCOPES = "playlist-modify-private playlist-read-private";
const Auth = () => {
  const dispatch = useDispatch();

  let accessToken = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1];

  if (accessToken) {
    dispatch(setToken(accessToken));
  }

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="container-login">
      <h1>Silahkan Login Untuk Melanjutkan</h1>
      <button onClick={handleLogin}>Login to spotify</button>
    </div>
  );
};

export default Auth;
