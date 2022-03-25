import React from "react";

function Tracks({ data }) {
  const time = new Date(data.duration_ms);
  return (
    <div className="playlist-container">
      <div className="song-list">
        <div className="item1">
          <p className="songs">{data.name}</p>
          <p className="artist">{data.album.artists[0].name}</p>
        </div>
        <div className="item2">
          <p>
            <button>Select</button>
            {time.getMinutes()}:{time.getSeconds()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tracks;
