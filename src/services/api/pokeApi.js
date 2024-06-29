import { useHttp } from "./base/useHttp";

const pokeApi = () => {
  const httpInstance = useHttp("https://pokeapi.co/api/v2", {
    "Content-Type": "application/json",
  });

  const getPokemons = async (offset, limit) => {
    return await httpInstance.get(`/pokemon?offset=${offset}&limit=${limit}`);
  };

  const getPokemonDetails = async (pokemon) => {
    return await httpInstance.get(`/pokemon/${pokemon}`);
  };

  return {
    getPokemons,
    getPokemonDetails,
  };
};

export default pokeApi;
