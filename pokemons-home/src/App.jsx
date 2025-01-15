import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PokemonList from "pokemonList/PokemonList";
import usePokemonSelected from "pokemonList/Pokemon";
import "./App.css";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Sidenav from "./components/Sidenav";

function Home() {
  const [pokemon] = usePokemonSelected();

  return (
    <div className="main-content">
      <PokemonList />
      {pokemon && (
        <div className="container">
          <h1 style={{ color: "#1e3a8a" }}>Selected Pokémon:</h1>
          <div className="pokemon-card-container">
            <img
              src={pokemon?.sprite}
              className="pokemon-image"
              aria-label="Image of Pokemon Selected"
            />
            <label className="pokemon-name">{pokemon?.name}</label>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidenav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
