import axios from "axios";
import { ResponseListPokemon } from "../model/ResponseListPokemon";
import { ResponsePokeByid } from "../model/ResponsePokeById";

const BASE_ENDPOINT = "https://pokeapi.co/api/v2/pokemon";

const getListPokemon = async (offset: number, limit: number) => {
  return await axios
    .get<ResponseListPokemon>(
      `${BASE_ENDPOINT}/?offset=${offset}&limit=${limit}`
    )
    .then((res) => res.data);
};

const getPokemonById = async (id: string) => {
  return await axios
    .get<ResponsePokeByid>(`${BASE_ENDPOINT}/${id}`)
    .then((res) => res.data);
};

export { getListPokemon, getPokemonById };
