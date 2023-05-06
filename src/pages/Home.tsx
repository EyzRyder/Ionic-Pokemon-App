import {
  IonContent,
  IonPage,
} from '@ionic/react';
import { useQuery } from 'react-query';
import { getAllPokemon } from '../services/pokeApi';
import PokeCard from '../components/PokeCard';
import { Link } from 'react-router-dom';
import { PokemonList, PokemonListResults } from '../types/pokemon';
import { useState } from 'react';

const Home: React.FC = () => {
  const [page, setPage] = useState(0);
  const { data, isFetching, error, refetch } = useQuery<PokemonList>('Pokemons', async () => {
    const response = await getAllPokemon(page);
    return response.data
  }, {
    staleTime: 1000 * 60,
  });



  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": "var(--ion-color-secondary-tint)" }}>
        {isFetching && (
          <div> loading</div>
        )}
        <div className='flex flex-wrap gap-7 justify-center items-center py-6 px-3'>
          {
            data && data.results.map((pokemon: PokemonListResults) => (
              <PokeCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))
          }
        </div>

        {
          data && (
            <div className='flex px-3 py-4 gap-4 justify-center items-center'>
              {page >= 1 && (
                <>
                  <p onClick={async () => { await setPage(0); await refetch(); }}>{"<< Start"}</p>
                  <p onClick={async () => { await setPage(page - 1); await refetch(); }}>{"< Prev"}</p>
                </>
              )}
              <div className='flex gap-4'>
                {page-2 > 0 && <p onClick={async () => { await setPage(page-2); await refetch(); }} className='underline'>
                  {(page-1)}
                </p>}
                {page > 0 && <p onClick={async () => { await setPage(page-1); await refetch(); }} className='underline'>
                  {(page)}
                </p>}
                <p className='underline text-primary-default'>
                  {page + 1}
                </p>
                {page + 1 < 65 && <p onClick={async () => { await setPage(page + 1); await refetch(); }} className='underline'>
                  {page + 2}
                </p>}
                {page + 2 < 65 && <p onClick={async () => { await setPage(page + 2); await refetch(); }} className='underline'>
                  {page + 3}
                </p>}
              </div>
              <p onClick={async () => { await setPage(page + 1); await refetch(); }}>{"Next >"}</p>
              <p onClick={async () => { await setPage(64); await refetch(); }} >{"end >>"}</p>
            </div>
          )
        }


      </IonContent>
    </IonPage>
  );
};

export default Home;
