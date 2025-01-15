import { useEffect } from "react";
import useSelectPokemon, {
  addAllPokemons,
  pokemons as pokemonState,
} from "../../atoms/Pokemon";
import { useAtom } from "jotai";

import style from "./PokemonList.module.css";

const PokemonList = () => {
  const [, addPokemons] = useAtom(addAllPokemons);
  const [pokemons] = useAtom(pokemonState);
  const [, setSelectPokemon] = useSelectPokemon();

  const fetchPokemons = async () => {
    const jsonData = [
      {
          "id": 1,
          "name": "ditto",
          "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
      },
      {
          "id": 2,
          "name": "pikachu",
          "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
      },
      {
          "id": 3,
          "name": "mewtwo",
          "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
      },
      {
          "id": 4,
          "name": "snorlax",
          "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"
      },
      {
          "id": 5,
          "name": "charmander",
          "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
      },
      {
          "id": 6,
          "name": "zubat",
          "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png"
      }
  ]
    addPokemons(jsonData);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className={style.container}>
      <h1>Pokémon List Micro Frontend</h1>
      <div className={style.pokemonCardContainer}>
        {pokemons.map((pokemon) => {
          return (
            <div
              className={style.pokemonCard}
              key={pokemon.id}
              onClick={() => setSelectPokemon(pokemon)}
            >
              <img
                src={pokemon.sprite}
                aria-label={`Image of pokemon ${pokemon.name}`}
              />
              <label>{pokemon.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
