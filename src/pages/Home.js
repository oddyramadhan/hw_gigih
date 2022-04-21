import "../components/Cart.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "./reducers/Slicer";

function Home() {
  const token = useSelector((state) => state.token.token);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRecom = async () => {
      const data = await fetch(
        `https://api.spotify.com/v1/browse/new-releases`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => response.json());
      // .then((response) => {
      //   if (typeof response.error === "object") {
      //     alert("Token anda sudah kadaluarsa, silahkan login kembali");
      //     dispatch(removeToken());
      //   }
      // });

      setData(data.albums.items);
      console.log("Fetch data", data);
    };
    getRecom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="kotak">
      <h1>New Release</h1>
      <div className="container-item">
        {data &&
          data.map((v, index) => {
            return (
              <div className="container" key={index}>
                <div className="card">
                  <div className="imgBx">
                    <img alt="" src={v.images[0].url} />
                  </div>
                  <div className="contentBx">
                    <h3>{v.name}</h3>
                    <div className="size">
                      <h3>{v.artists[0].name}</h3>
                      ||<h3>{v.album_type}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
