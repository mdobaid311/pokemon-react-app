import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/pokemon_logo.png";
import "./Home.css";

import Pokemons from "./Pokemons";

const Home = () => {
  const [name, setName] = useState("");

  return (
    <section>
      <img src={logo} alt="logo" />
      <div className="input-container">
        <input
          type="text"
          className="home-input"
          placeholder="Seach by name.."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Link to={`/pokemon/${name}`} className="btn">
          search
        </Link>
      </div>
      <Link to="/pokemons" className="btn poke">
        View all pokemons
      </Link>
    </section>
  );
};

export default Home;
