import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function Tracks({ data }) {
  const token = useSelector((state) => state.token.token);
  const [res, setRes] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      //   e.preventDefault();
      const res = await fetch(
        `	https://api.spotify.com/v1/playlists/${data}/tracks`,
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      ).then((response) => response.json());

      setRes(res.items);
      console.log("Fetch data", res);
    };
    getTracks();
  }, []);
  // console.log(token);
  function duration(time) {
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const navigate = useNavigate();
  const toAddSong = () => {
    navigate("/add-song", { state: { data } });
  };

  console.log(data);
  return (
    <div className="playlist-container">
      <ol>
        {res &&
          res.map((v, index) => {
            return (
              <li className="track-list" key={index}>
                <div className="song-list">
                  <div className="item1">
                    <p className="songs">{v.track.name}</p>
                    <p className="artist">{v.track.artists[0].name}</p>
                  </div>
                  <div className="item2">
                    <p>{duration(v.track.duration_ms)}</p>
                  </div>
                </div>
              </li>
            );
          })}
      </ol>
      {/* <NavLink to="/add-song"> */}
      <button
        className="add-song"
        onClick={() => {
          toAddSong();
        }}
      >
        Add Songs
      </button>
      {/* </NavLink> */}
    </div>
  );
}

export default Tracks;
