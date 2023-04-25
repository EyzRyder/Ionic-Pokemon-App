const getIdFromUrl = (url: string): string => {
  return url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/",""); 
};
export {
  getIdFromUrl
}