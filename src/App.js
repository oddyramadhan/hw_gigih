import "./App.css";
import Albums from "./components/Albums";
import { Route, Routes } from "react-router-dom";
import WebApp from "./pages/implicit_grant/App";

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

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<WebApp />} />
        <Route path="/dashboard" element={<Albums />}></Route>
      </Routes>
    </div>
  );
}
export default Playlist;
