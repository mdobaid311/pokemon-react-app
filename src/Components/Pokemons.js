import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";

import "./Pokemons.css";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const typeValueRef = useRef();
  const searchValueRef = useRef();

  const types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "grass",
    "water",
    "electric",
    "psychic",
    "ice",
    "dark",
    "fairy",
    "unknown",
    "shadow",
  ];

  const prevPage = () => {
    setPage((oldPage) => {
      if (page <= 0) {
        return 0;
      }
      let prevPage = oldPage - 24;
      return prevPage;
    });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 24;
      return nextPage;
    });
  };

  const URL = ` https://pokeapi.co/api/v2/pokemon?limit=24&offset=${page}`;

  const getPokemons = async (url) => {
    const response = await axios.get(url);
    setPokemons(response.data.results);
    console.log(response.data.results);
  };

  useEffect(() => {
    getPokemons(`${URL}`);
  }, [URL, page]);

  const fetchPokemons = async (type) => {
    try {
      const response = await axios.get(
        ` https://pokeapi.co/api/v2/type/${type}`
      );
      console.log(response.data.pokemon[0].pokemon);

      const filteredPokemons = [];
      response.data.pokemon.forEach((poke) => {
        filteredPokemons.push(poke.pokemon);
      });
      setPokemons([]);
      setPokemons(filteredPokemons);
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = async () => {
    try {
      const name = searchValueRef.current.value;

      setPokemons([
        { name: name, url: `https://pokeapi.co/api/v2/pokemon/${name}` },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterHandler = () => {
    const type = typeValueRef.current.value;
    fetchPokemons(type);
  };

  useEffect(() => {}, [typeValueRef]);

  return (
    <div className="container">
      <form className="filters-container">
        <div>
          <label htmlFor="type">Type: </label>
          <select name="type" id="type" className="input" ref={typeValueRef}>
            {types.map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })}
          </select>
          <button type="button" className="input" onClick={filterHandler}>
            filter
          </button>
        </div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          className="input search"
          id="search"
          placeholder="Search by name"
          autoComplete="off"
          ref={searchValueRef}
        />
        <button type="button" className="input" onClick={searchHandler}>
          Search
        </button>
      </form>
      <div className="poke-container">
        {pokemons
          ? pokemons.map((pokemon, index) => {
              return <Pokemon key={index} pokemon={pokemon} />;
            })
          : ""}
      </div>
      <div className="control-buttons">
        {count > 0 && (
          <button
            type="button"
            onClick={() => {
              setPokemons([]);
              prevPage();
              setCount(count - 1);
            }}
          >
            Prev Page
          </button>
        )}

        <span>{count}</span>
        <button
          type="button"
          onClick={() => {
            setPokemons([]);
            nextPage();
            setCount(count + 1);
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pokemons;
