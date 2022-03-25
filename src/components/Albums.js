import React from "react";
import Tracks from "./Tracks";

function Albums({ data }) {
  return (
    <div className="container">
      <div className="box">
        <div className="playing">
          <img className="logo" alt="album" src={data.album.images[0].url} />
          <div className="list">
            <p>{data.album.type}</p>
            <p className="album">{data.album.name}</p>
            <p>{data.album.artists[0].name}</p>
          </div>
          <div className="btn">
            <button>
              <img src="play.logo.png" height="20px" width="30px" alt="play" />
            </button>
          </div>
        </div>
      </div>
      <div className="playlist-song">
        <div className="head">
          <p>TITLE</p>
          <p>DURATION</p>
        </div>
        <Tracks data={data} />
      </div>
    </div>
  );
}

export default Albums;
