import axios from "axios";
import { ResponseListPokemon } from "../model/ResponseListPokemon";
import { ResponsePokeByid } from "../model/ResponsePokeById";
import { ResponseAbilities } from "../model/ResponseAbilities";

const BASE_ENDPOINT = "https://pokeapi.co/api/v2/";

const getListPokemon = async (offset: number, limit: number) => {
  return await axios
    .get<ResponseListPokemon>(
      `${BASE_ENDPOINT}pokemon/?offset=${offset}&limit=${limit}`
    )
    .then((res) => res.data);
};

const getPokemonById = async (id: string) => {
  return await axios
    .get<ResponsePokeByid>(`${BASE_ENDPOINT}pokemon/${id}`)
    .then((res) => res.data);
};

const getAbilities = async (id: string) => {
  const fullEndpoint = `${BASE_ENDPOINT}ability/${id}`
  return await axios
    .get<ResponseAbilities>(`${BASE_ENDPOINT}ability/${id}`)
    .then((res) => res.data);
};

export { getListPokemon, getPokemonById, getAbilities };
