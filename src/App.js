import { useEffect, useState } from "react";
import "./App.css";

function Playlist() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getDataAndRender = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json"
        );
        if (!response.ok) throw new Error("Error");
        const results = await response.json();
        console.log("using async", results);
        setData(results);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    getDataAndRender();
  }, []);

  if (data.album === undefined) {
    return <h2>Loading..</h2>;
  }
  const time = new Date(data.duration_ms);
  return (
    <div className="wrapper">
      <div className="container">
        <div className="box">
          <div className="playing">
            <img
              className="logo"
              alt="album-photo"
              src={data.album.images[0].url}
            />
            <div className="list">
              <p>{data.album.type}</p>
              <p className="album">{data.album.name}</p>
              <p>{data.album.artists[0].name}</p>
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
        </div>
      </div>
    </div>
  );
}
export default Playlist;
