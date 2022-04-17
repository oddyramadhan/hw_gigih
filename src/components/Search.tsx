import "./Cart.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../pages/reducers/store";

type IData = {
  album: {
    images: [{ url: string }];
  };
  name: string;
  artists: [{ name: string }];
  duration_ms: number;
  preview_url: string;
};

function Search() {
  const token = useSelector<RootState>((state) => state.token.token);
  const [data, setData] = useState<IData[]>([]);
  const [name, setName] = useState("");

  const getTrack = async (e) => {
    e.preventDefault();
    const data = await fetch(
      `https://api.spotify.com/v1/search?q=${name}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));

    setData(data.tracks.items);
    console.log("Fetch data", data);
  };

  function duration(time) {
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  }

  return (
    <div className="kotak">
      <div className="search">
        <form onSubmit={getTrack}>
          <input
            type="text"
            placeholder="Search by album/track"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="container-item">
        {data &&
          data.map((v, index) => {
            return (
              <div className="container" key={index}>
                <div className="card">
                  <div className="imgBx">
                    <img alt="" src={v.album.images[0].url} />
                  </div>
                  <div className="contentBx">
                    <h3>{v.name}</h3>
                    <div className="size">
                      <h3>{v.artists[0].name}</h3>
                      ||<h3>{duration(v.duration_ms)}</h3>
                    </div>
                    <a href={v.preview_url} target="_blank" rel="noreferrer">
                      Preview
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Search;
