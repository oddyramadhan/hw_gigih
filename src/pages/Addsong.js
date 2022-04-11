import React from "react";
// import Tracks from "./Tracks";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function AddSong() {
  const token = useSelector((state) => state.token.token);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);
  const location = useLocation();

  const handleSelect = (uri) => {
    setSelected([...selected, uri]);
  };

  const handleDelete = (uri) => {
    setSelected(selected.filter((item) => item !== uri));
  };

  useEffect(() => {
    console.log("Selected", selected);
  }, [selected]);

  const addItems = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://api.spotify.com/v1/playlists/${location.state.data}/tracks?uris=${selected}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

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
    console.log("Fetch data", data);
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
          <button className="submit" type="submit">
            Search
          </button>
        </form>
        <button className="selected" onClick={addItems}>
          Add Selected Items to Playlist
        </button>
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
                          onClick={() => {
                            handleSelect(v.uri);
                          }}
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AddSong;
