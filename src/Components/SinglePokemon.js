import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import "./SinglePokemon.css";

const SinglePokemon = () => {
  const { name } = useParams();
  const [mainImage, setMainImage] = useState();
  const [pokemon, setPokemon] = useState();
  console.log(name);

  const URL = ` https://pokeapi.co/api/v2/pokemon/${name}`;

  const getPokemon = async () => {
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      setPokemon(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  console.log(mainImage);
  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="single-pokemon-container">
      {/* <div >
        <Link to="/pokemons">
          <IoIosArrowBack />
          Back
        </Link>
        / <span className="pokemon-name">{pokemon && pokemon.name}</span>
        <img src="" alt="" />
      </div> */}
      <div className="desc">
        <div className="images section">
          <img
            src={pokemon && pokemon.sprites.other.home.front_default}
            alt=""
            className="main-image"
          />
        </div>
        <div className="desc-table section">
          <h1>{pokemon && pokemon.name}</h1>
          <table
            style={{
              backgroundColor: `${color}`,
            }}
          >
            <tbody>
              <tr>
                <th>Name</th>
                <td>{pokemon && pokemon.name}</td>
              </tr>
              <tr>
                <th>ID</th>
                <td>{pokemon && pokemon.id}</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{pokemon && pokemon.height}</td>
              </tr>
              <tr>
                <th>Base Experience</th>
                <td>{pokemon && pokemon.base_experience}</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{pokemon && pokemon.height}</td>
              </tr>
              <tr>
                <th>Moves</th>
                <td>
                  {pokemon &&
                    pokemon.moves.slice(0, 5).map((move, key) => {
                      return <span>{`${move && move.move.name},`}</span>;
                    })}
                </td>
              </tr>
              <tr>
                <th>Types</th>
                <td>
                  {pokemon &&
                    pokemon.types.map((type, key) => {
                      return <span>{type && type.type.name}</span>;
                    })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SinglePokemon;
