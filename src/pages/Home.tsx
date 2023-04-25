import {
  IonContent,
  IonPage,
} from '@ionic/react';
import './Home.scss';
import { useQuery } from 'react-query';
import { getAllPokemon } from '../services/pokeApi';
import PokeCard from '../components/PokeCard';
import { Link } from 'react-router-dom';
import { PokemonList, PokemonListResults } from '../types/pokemon';

const Home: React.FC = () => {
  const { data, isFetching, error } = useQuery<PokemonList>('Pokemons', async () => {
    const response = await getAllPokemon;
    return response.data
  }, {
    staleTime: 1000 * 60,
  });

  return (
    <IonPage>
        <IonContent fullscreen>
          {isFetching && (
            <div> loading</div>
        )}
        <div className='flex flex-wrap gap-7 justify-center items-center'>
        {
            data && data.results.map((pokemon: PokemonListResults) => (
            <PokeCard key={pokemon.name} name={pokemon.name} url={pokemon.url}/>
            ))
          }
        </div>

        {
          data && (
            <div className='flex gap-4 justify-center items-center'>
              <div>{"< Prev"}</div>
              <ul className='flex gap-1'>
                <Link to={"/"} className='underline text-secondary-default'>1</Link>
                <Link to={"/"} className='underline text-secondary-default'>2</Link>
                <Link to={"/"} className='underline text-secondary-default'>{data.count}</Link>
              </ul>
              <div>{"Next >"}</div>
            </div>
          )
        }



        </IonContent>
      </IonPage>
  );
};

export default Home;
