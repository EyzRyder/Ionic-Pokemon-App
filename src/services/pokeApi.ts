import Axios from "axios";

const api = Axios.create({ baseURL: "https://pokeapi.co/api/v2/" });
const getAllPokemon = (page: number=0) => api.get(`pokemon/?offset=${page * 20}&limit=20}`);
const getOnePokemon = (id: any) => api.get(`pokemon/${id}`);

export {
  api,
  getAllPokemon,
  getOnePokemon
}