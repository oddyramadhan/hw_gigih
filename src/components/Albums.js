import React from "react";
import Tracks from "./Tracks";
import data from "../Data";

// data = Array.from(data)
function Albums() {
  return (
    <div className="kotak">
      {data.map((v, index) => (
        <div className="container" key={index}>
          <div className="box">
            <div className="playing">
              <img className="logo" alt="" src={v.album?.images[0].url} />
              <div className="list">
                <p className="album-type">{v.album?.album_type}</p>
                <p className="name">{v.album?.name}</p>
                <p>{v.album?.artists[0].name}</p>
              </div>
              <div className="btn">
                <button>
                  <img
                    src="play.logo.png"
                    height="20px"
                    width="30px"
                    alt="play"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="playlist-song">
            <div className="head">
              <p>TITLE</p>
              <p>DURATION</p>
            </div>
            <ol>
              <li>
                <Tracks data={v} />
              </li>
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Albums;
