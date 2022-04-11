import React from "react";
import Tracks from "../components/Tracks";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function MyPlaylist() {
  const token = useSelector((state) => state.token.token);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlaylist = async () => {
      //   e.preventDefault();
      const data = await fetch(
        `	https://api.spotify.com/v1/users/oddy.ramadhan-id/playlists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => response.json());

      setData(data.items);
      console.log("Fetch data", data);
    };
    getPlaylist();
  }, []);
  console.log(token);
  return (
    <div className="kotak">
      <div className="search"></div>
      {data &&
        data.map((v, index) => {
          return (
            <div className="container" key={index}>
              <div className="box">
                <div className="playing">
                  <img className="logo" alt="" src={v.images.url} />
                  <div className="list">
                    <p className="album-type">{v.type}</p>
                    <p className="name">{v.name}</p>
                    <p>{v.description}</p>
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
                  </div>
                </div>
              </div>
              <div className="playlist-song">
                <div className="head">
                  <p>TITLE</p>
                  <p>DURATION</p>
                </div>
                {<Tracks data={v.id} />}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MyPlaylist;
