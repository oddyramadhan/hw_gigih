import React, { useEffect, useState } from "react";
import "./CreatePlaylist.css";
import { useSelector } from "react-redux";

function CreatePlaylist() {
  const token = useSelector((state) => state.token.token);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errortitle, setErrortitle] = useState({
    required: false,
    minlength: false,
  });

  useEffect(() => {
    if (title.length <= 0) {
      setErrortitle(() => ({ required: true, minlength: false }));
    }
    if (title.length > 0 && title.length < 10) {
      setErrortitle(() => ({ required: false, minlength: true }));
    } else {
      setErrortitle(() => ({ required: false, minlength: false }));
    }
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ` + token);

    var raw = JSON.stringify({
      name: `${title}`,
      description: `${desc}`,
      public: "false",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api.spotify.com/v1/users/oddy.ramadhan-id/playlists",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Playlist added");
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setTitle("");
        setDesc("");
      });
  };

  return (
    <div className="container-create">
      <div className="kotak-create">
        <div className="box-create">
          <h1>Create Playlist</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              placeholder="Playlist title"
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            {errortitle.minlength && (
              <p className="required">Title must be at-least 10 characters</p>
            )}
            <input
              type="text"
              value={desc}
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <br></br>
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;
