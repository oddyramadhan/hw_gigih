const parseJSON = (res) => res.json();
const SPOTIFYURL = "https://api.spotify.com/v1/me";

export const fetchUserData = (token) => {
  return (dispatch) => {
    dispatch({ type: "LOADING_SPOTIFY_DATA" });
    return fetch(SPOTIFYURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(parseJSON)
      .then((data) => {
        dispatch({ type: "ADD_SPOTIFY_USER", spotifyuser: data });
      });
  };
};
