/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/PokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

const usePokemonPaginated = () => {
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
  const [simplePokemons, setSimplePokemons] = useState<SimplePokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    nextPageUrl.current = resp.data.next;
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, picture, name};
    });

    setSimplePokemons([...simplePokemons, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    simplePokemons,
    loadPokemons,
  };
};

export default usePokemonPaginated;
