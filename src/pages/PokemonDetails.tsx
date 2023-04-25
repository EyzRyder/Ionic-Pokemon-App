import {
  IonContent,
  IonPage,
} from '@ionic/react';
import './Home.scss';
import { useQuery } from 'react-query';
import { getOnePokemon } from '../services/pokeApi';
import PokeCard from '../components/PokeCard';
import { Pokemon } from '../types/pokemon';
import { useParams } from 'react-router';

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery<Pokemon>('Pokemon', async () => {
    const response = await getOnePokemon(id);
    return response.data
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        {isFetching && (
          <div> loading</div>
        )}
        {data && <div className="flex flex-col justify-center items-center gap-2 px-3 py-2 bg-slate-600 w-48 "> <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${data.id}.png `} alt={data.name} />
          <h2 className='text-primary-default font-semibold'>
            {data.name}
          </h2>
          <p>{data.id}</p>
        </div>}
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetails;
