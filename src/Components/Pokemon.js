import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Pokemon.css";

const Pokemon = ({ pokemon: poke }) => {
  const [pokemon, setPokemon] = useState();

  const getSinglePokemon = async (url) => {
    const response = await axios.get(url);
    setPokemon(response.data);
  };

  useEffect(() => {
    getSinglePokemon(poke.url);
  }, [poke]);

  const getPokemonTypeColor = (type) => {
    const colors = {
      fire: "#FDDFDF",
      grass: "#DEFDE0",
      electric: "#FCF7DE",
      water: "#DEF3FD",
      ground: "#f4e7da",
      rock: "#d5d5d4",
      fairy: "#fceaff",
      poison: "#98d7a5",
      bug: "#f8d5a3",
      dragon: "#97b3e6",
      psychic: "#eaeda1",
      flying: "#F5F5F5",
      fighting: "#E6E0D4",
      normal: "#F5F5F5",
    };
    const color = colors[type];
    return color;
  };

  const color = getPokemonTypeColor(pokemon ? pokemon.types[0].type.name : "");

  return (
    <Link to={`/pokemon/${pokemon ? pokemon.name : ""}`}>
      <div
        className="pokemon"
        style={{
          backgroundColor: `${color}`,
        }}
      >
        <div className="img-container">
          <img
            src={pokemon ? pokemon.sprites.other.home.front_default : ""}
            alt=""
          />
        </div>
        <div className="info">
          <h3 className="name ">
            {" "}
            {pokemon
              ? pokemon.name.length > 10
                ? `${pokemon.name.slice(0, 7)}...`
                : pokemon.name
              : ""}{" "}
          </h3>
          <small className="type">
            Type: <span> {pokemon ? pokemon.types[0].type.name : ""} </span>
          </small>
        </div>
      </div>
    </Link>
  );
};

export default Pokemon;
