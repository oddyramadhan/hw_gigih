import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Silahkan Login Dahulu...</h1>
      <Link to="/auth">
        <p>Login</p>
      </Link>
    </div>
  );
}

export default Home;
