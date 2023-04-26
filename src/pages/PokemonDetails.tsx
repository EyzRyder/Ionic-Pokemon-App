import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/react';
import './Home.scss';
import { useQuery } from 'react-query';
import { getOnePokemon } from '../services/pokeApi';
import { Pokemon } from '../types/pokemon';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { TransformCMtoM, TransformGtoKG } from '../services/helpers';

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery<Pokemon>('Pokemon', async () => {
    const response = await getOnePokemon(id);
    return response.data
  });
  const [pokeimg, setPokeimg] = useState<string | undefined>("");

  useEffect(() => {
    setPokeimg(data?.sprites.versions['generation-v']['black-white'].front_default)
  }, [data])

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='flex justify-center items-center min-h-screen relative '>

          {isFetching && (
            <div className='absolute'> loading</div>
          )}
          {data &&
            <div className="flex flex-row max-md:flex-col justify-between items-center gap-2 px-10 py-8 bg-slate-600 rounded-lg w-[65vw] h-[80vh]">
              <div>
                <h1 className='text-primary-default font-semibold text-center text-2xl'>
                  {data.name}
                  <span>#{data.id}</span>
                </h1>
                <div className='relative'>
                  <img
                    src={pokeimg}
                    className='w-96'
                    alt={data.name}
                  />
                  <IonIcon />
                </div>
              </div>
              <div className='px-10 py-10 rounded-lg bg-gray-500 '>
                <table className='flex flex-col gap-2'>
                  <tr className='flex flex-row gap-2'>
                    <td className='font-bold'>Height</td>
                    <td>{TransformCMtoM(data.height)} m</td>
                  </tr>
                  <tr className='flex flex-row gap-2'>
                    <td className='font-bold'>Weight</td>
                    <td>{TransformGtoKG(data.weight)} kg</td>
                  </tr>
                </table>
                <div className='flex flex-col gap-3'>
                  <div>
                    <h3 className='pb-1'>Types</h3>
                    <div className='flex gap-2'>
                      {data.types.map(type => (
                        <span className={`px-3 py-1 mt-1 rounded-full ${type.type.name}`}>
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className='pb-1'>Abilities</h3>
                    <div className='flex flex-wrap gap-2'>
                      {data.abilities.map(abilityData => (
                        <span>
                          {abilityData.ability.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetails;
