import React, { useContext, useEffect, useState } from "react";

const PokemonsContext = React.createContext();

export const PokemonsProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [filtereedPokemons, setFilteredPokemons] = useState(pokemons);
  const [pokemon, setPokemon] = useState();



  return (
    <PokemonsContext.Provider
      value={{ pokemons, setPokemon, pokemon }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokemonsContext = () => {
  return useContext(PokemonsContext);
};
