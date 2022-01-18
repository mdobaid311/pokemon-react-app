import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Components/Home";
import Pokemons from "./Components/Pokemons";
import Pokemon from "./Components/Pokemon";
import Error from "./Components/Error";
import SinglePokemon from "./Components/SinglePokemon";

import "./App.css"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pokemons">
          <Pokemons />
        </Route>
        <Route path="/pokemon/:name">
          <SinglePokemon />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
