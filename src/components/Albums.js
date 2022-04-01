import React from "react";
import Tracks from "./Tracks";
import { useState, useEffect } from "react";

function Albums() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // getToken()

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

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
      `https://api.spotify.com/v1/search?q=${name}&type=album`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => response.json());
    // .then((data) => console.log(data.albums.items));

    setData(data.albums.items);
  };
  console.log(data);
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
      </div>
      {data &&
        data.map((v, index) => {
          return (
            <div className="container" key={index}>
              <div className="box">
                <div className="playing">
                  <img className="logo" alt="" src={v.images[0].url} />
                  <div className="list">
                    <p className="album-type">{v.album_type}</p>
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
                      <button className="btn2" onSelect={handleSelect}>
                        Select
                      </button>
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
