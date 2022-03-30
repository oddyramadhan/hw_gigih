import React, { useEffect } from "react";
import Playlist from "../../../App";
// import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists/SpotifyGetPlaylists";
// import "./WebApp.css";

const CLIENT_ID = "d8aaffad66dc46989595aa50b3414ea2"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/playlist";
const SCOPES = "playlist-modify-private";

/* 
http://localhost:3000/webapp#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/
const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

const WebApp = () => {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="container">
      <h1>hi</h1>
      <button onClick={handleLogin}>login to spotify</button>
      <Playlist />
    </div>
  );
};

export default WebApp;