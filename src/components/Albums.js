import React from "react";
// import Tracks from "./Tracks";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CreatePlaylist from "../pages/CreatePlaylist";

function Albums() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  const [token] = useState(
    window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1]
  );

  const handleSelect = (uri) => {
    setSelected([...selected, uri]);
  };

  const handleDelete = (uri) => {
    setSelected(selected.filter((item) => item !== uri));
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const getDataAndRender = async (e) => {
    e.preventDefault();
    const data = await fetch(
      `https://api.spotify.com/v1/search?q=${name}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => response.json());

    setData(data.tracks.items);
    console.log(data);
  };
  return (
    <div className="kotak">
      <div className="search">
        <form onSubmit={getDataAndRender}>
          <input
            type="text"
            placeholder="Search by album/track"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="btn-create">
          <NavLink to="/createplaylist">
            <button onClick={() => <CreatePlaylist />}>Create Playlist</button>
          </NavLink>
        </div>
      </div>
      {data &&
        data.map((v, index) => {
          return (
            <div className="container" key={index}>
              <div className="box">
                <div className="playing">
                  <img className="logo" alt="" src={v.album.images[0].url} />
                  <div className="list">
                    <p className="album-type">{v.type}</p>
                    <p className="name">{v.name}</p>
                    <p>{v.artists[0].name}</p>
                  </div>
                  <div className="btn">
                    <button className="btn1">
                      <img
                        src="play.logo.png"
                        height="20px"
                        width="30px"
                        alt="play"
                      />
                    </button>
                    <div>
                      {selected.includes(v.uri) ? (
                        <button
                          className="btn3"
                          onClick={() => handleDelete(v.uri)}
                        >
                          Selected
                        </button>
                      ) : (
                        <button
                          className="btn2"
                          onClick={() => handleSelect(v.uri)}
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="playlist-song">
                <div className="head">
                  <p>TITLE</p>
                  <p>DURATION</p>
                </div>
                <ol>
                  <li>{<Tracks data={v} />}</li>
                </ol>
              </div> */}
            </div>
          );
        })}
    </div>
  );
}

export default Albums;
