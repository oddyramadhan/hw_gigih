import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function AddSong() {
  const token = useSelector((state) => state.token.token);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);
  const location = useLocation();
  const playlistID = location.search.split("=")[1];

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

    const selectedPost = selected.map((i) =>
      fetch(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${i.uri}`,
        requestOptions
      )
    );

    // eslint-disable-next-line no-unused-vars
    const hasil = Promise.all(selectedPost)
      .then((res) => {
        console.log(res);
        alert("Items added");
      })
      .finally(() => setSelected([]));
    console.log(selectedPost);
  };

  const getTracks = async (e) => {
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
      <div className="search-add">
        <form onSubmit={getTracks}>
          <input
            type="text"
            placeholder="Search by album/track"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit" type="submit">
            Search
          </button>
          <button className="selected" onClick={addItems}>
            Add Selected Items to Playlist
          </button>
        </form>
      </div>
      {selected &&
        selected.map((v, index) => {
          return (
            <div className="container" key={index}>
              <div className="item">
                <div className="playing">
                  <img className="logo" alt="" src={v.album.images[0].url} />
                  <div className="list">
                    <p className="album-type">{v.type}</p>
                    <p className="name">{v.name}</p>
                    <p>{v.artists[0].name}</p>
                  </div>
                  <div className="btn">
                    <div>
                      {selected.includes(v) ? (
                        <button
                          className="btn3"
                          onClick={() => handleDelete(v)}
                        >
                          Selected
                        </button>
                      ) : (
                        <button
                          className="btn2"
                          onClick={() => {
                            handleSelect(v);
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
      {data &&
        data
          .filter((ura) => !selected.includes(ura))
          .map((v, index) => {
            return (
              <div className="container" key={index}>
                <div className="item">
                  <div className="playing">
                    <img className="logo" alt="" src={v.album.images[0].url} />
                    <div className="list">
                      <p className="album-type">{v.type}</p>
                      <p className="name">{v.name}</p>
                      <p>{v.artists[0].name}</p>
                    </div>
                    <div className="btn">
                      <div>
                        {selected.includes(v.uri) ? (
                          <button
                            className="btn3"
                            onClick={() => handleDelete(v)}
                          >
                            Selected
                          </button>
                        ) : (
                          <button
                            className="btn2"
                            onClick={() => {
                              handleSelect(v);
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
