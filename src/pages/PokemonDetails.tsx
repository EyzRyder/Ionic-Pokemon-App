import {
  IonContent,
  IonPage,
} from '@ionic/react';
import './Home.scss';
import { useQuery } from 'react-query';
import { getOnePokemon } from '../services/pokeApi';
import { Pokemon } from '../types/pokemon';
import { useParams } from 'react-router';

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery<Pokemon>('Pokemon', async () => {
    const response = await getOnePokemon(id);
    return response.data
  });

  const typeColors = {
    "background":"red"
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='flex justify-center items-center min-h-screen relative'>

          {isFetching && (
            <div className='absolute'> loading</div>
          )}
          {data &&
            <div className="flex flex-col justify-center items-center gap-2 px-10 py-8 bg-slate-600 rounded-lg">
              <h2 className='text-primary-default font-semibold'>
                {data.name}
                <span>#{data.id}</span>
              </h2>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${data.id}.png `} alt={data.name} />
              <table className='flex flex-col gap-2'>
                <tr className='flex flex-row gap-2'>
                  <td className='font-bold'>Height</td>
                  <td>{data.height} cm</td>
                </tr>
                <tr className='flex flex-row gap-2'>
                  <td className='font-bold'>Weight</td>
                  <td>{data.weight} kg</td>
                </tr>
              </table>
              <div>
                <h3>Types</h3>
                <div className='flex  gap-2'>
                  {data.types.map(type => (
                    <span className='px-3 py-1 rounded-full' style={typeColors}>
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <h3>Abilities</h3>
                <div className='flex gap-2'>
                  {data.abilities.map(abilityData => (
                    <span>
                      {abilityData.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetails;
