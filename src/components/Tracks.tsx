import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../pages/reducers/store";

interface IRes {
  track: {
    name: string;
    duration_ms: number;
    artists: [{ name: string }];
  };
}
function Tracks({ data }) {
  const token = useSelector<RootState>((state) => state.token.token);
  const [res, setRes] = useState<IRes[]>([]);

  useEffect(() => {
    const getTracks = async () => {
      const res = await fetch(
        `	https://api.spotify.com/v1/playlists/${data}/tracks`,
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      ).then((response) => response.json());

      setRes(res.items);
      // console.log("Fetch data", res);
    };
    getTracks();
  }, []);

  function duration(time) {
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  }

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
      <NavLink to={`/add-song?playlist:id=${data}`}>
        <button className="add-song">Add Songs</button>
      </NavLink>
    </div>
  );
}

export default Tracks;
