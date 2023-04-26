const getIdFromUrl = (url: string): string => {
  return url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/",""); 
};

const TransformGtoKG = (grams: number): number => {
  return grams / 10;
};

const TransformCMtoM = (centimeters: number): number => {
  return centimeters / 10
};
export {
  getIdFromUrl,
  TransformGtoKG,
  TransformCMtoM
}