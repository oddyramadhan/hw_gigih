import React from "react";
import "./index.css";

export default function Search() {
  return (
    <div className="search">
      <div className="form">
        <input type="text" placeholder="Search" />
        <button>Submit</button>
      </div>
      <img src="https://media.giphy.com/media/Vh8pbGX3SGRwFDh3V0/source.gif" />
    </div>
  );
}
