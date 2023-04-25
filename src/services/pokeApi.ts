import Axios from "axios";

const api = Axios.create({ baseURL: "https://pokeapi.co/api/v2/" });
const getAllPokemon = api.get("pokemon");
const getOnePokemon = (id: any) => api.get(`pokemon/${id}`);

export {
  api,
  getAllPokemon,
  getOnePokemon
}