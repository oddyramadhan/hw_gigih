import { useEffect, useState } from "react";
import "./App.css";
import Albums from "./components/Albums";
import { Route, Routes } from "react-router-dom";
import WebApp from "./pages/home/implicit_grant/App";

function Playlist() {
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   const getDataAndRender = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json"
  //       );
  //       if (!response.ok) throw new Error("Error");
  //       const results = await response.json();
  //       console.log("using async", results);
  //       setData(results);
  //     } catch (error) {
  //       console.log(error);
  //       alert(error);
  //     }
  //   };
  //   getDataAndRender();
  // }, []);

  // if (data.album === undefined) {
  //   return <h2>Loading..</h2>;
  // }

  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  useEffect(() => {
      const getDataAndRender = async () => {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${name}&type=album`, {
              headers: {
                Authorization: `Bearer BQA6sNZn4VPNZwoY2ErjtyUYNzP3FuWQYjnU3OcAyVZX1nYbUwEUqh3co6IPc9Bt_9igybYiJy5LAVjiFfvMgi7V3SJxD1t2UkichlfViwnC8tyhdZt68PykeSPmTpgJBn6amHhWGrn8RVAHu8tIYW9iBwNNzEViT70tQixhV7Jt3tOoeBo`
              },
              params: {
                q:"queen",
                type:"album"
              }
            }
          );
          if (!response.ok) throw new Error("Error");
          const results = await response.json();
          console.log("using async", results);
          setData(results);
        } 
        catch (error) {
          console.log(error);
        }
      };
      getDataAndRender();
    }, [name]);

  return (
    <div className="wrapper">
      <form  >
      <input type="text" onChange={(e) => setName(e.target.value)}/>
      <button type={"submit"}>Search</button>
      </form>
      <Routes>
        <Route path="/login" element={<WebApp/>} />
        <Route path="/playlist" element={<Albums  />}>
        </Route>
      </Routes>
    </div>
  );
}
export default Playlist;
