import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { playCircleOutline, pauseCircleOutline, handLeft, arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
// dependencies
import { useQuery } from 'react-query';
import { useNavigate, useParams, redirect } from 'react-router';
// helpers
import { getOnePokemon } from '../services/pokeApi';
import { TransformCMtoM, TransformGtoKG } from '../services/helpers';
//types
import { Pokemon } from '../types/pokemon';

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error , refetch} = useQuery<Pokemon>('Pokemon', async () => {
    const response = await getOnePokemon(id);
    return response.data
  });

  const [pokeimg, setPokeimg] = useState<string | undefined>();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    animated
      ? setPokeimg(data?.sprites.versions['generation-v']['black-white'].animated.front_default)
      : setPokeimg(data?.sprites.versions['generation-v']['black-white'].front_default)

  }, [data, animated])

  const imgStyle = {
    height: animated ? '70%' : '100%',
  }

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": "var(--ion-color-secondary-tint)" }}>
        <div className='flex justify-center items-center min-h-screen relative '>
          {parseInt(id) > 1 &&
            <IonIcon
              icon={arrowBackOutline}
              onClick={async() => {
                await navigate('/pokemon/' + (parseInt(id)-1));
                await refetch();
              }}
              className='absolute text-black top-10 left-10 text-xl hover:bg-primary-default bg-slate-100 p-3 rounded-full transition-all duration-200'
            />
          }
          <IonIcon
            icon={arrowForwardOutline}
            onClick={async () => {
              await navigate('/pokemon/' + (parseInt(id) + 1));
              await refetch();
            }}
            className='absolute text-black top-10 right-10 text-xl hover:bg-primary-default bg-slate-100 p-3 rounded-full transition-all duration-200'
          />
          {isFetching && (
            <div className='absolute'> loading</div>
          )}
          {data &&
            <>
              <div className="flex flex-row max-lg:flex-col justify-between items-center gap-20 px-10 py-8 bg-primary-default rounded-lg relative">
                <div className='bg-secondary-tint border-[1.5rem] border-white w-72 h-72 flex justify-center items-center overflow-hidden rounded-t-md rounded-bl-[3.5rem] rounded-br-md shadow-inner shadow-gray-300 relative'>
                  <img
                    src={pokeimg}
                    style={imgStyle}
                    className='transition-all duration-300'
                    alt={data.name}
                  />
                  <IonIcon
                    icon={animated ? pauseCircleOutline : playCircleOutline}
                    onClick={() => { setAnimated((state) => !state) }}
                    className='absolute text-primary-default bottom-1 right-1 text-xl'
                  />
                </div>
                <div className='px-10 py-10 rounded-lg bg-gray-500 '>
                  <h1 className='flex justify-between text-primary-default font-semibold text-center text-2xl mb-6'>
                    <span>
                      {data.name}
                    </span>
                    <span>#{data.id}</span>
                  </h1>
                  <div className='bg-tertiary-shade px-5 py-6 rounded-md'>

                    <table className='flex flex-col gap-2'>
                      <tbody>

                        <tr className='flex flex-row gap-2'>
                          <td className='font-bold'>Height</td>
                          <td>{TransformCMtoM(data.height)} m</td>
                        </tr>
                        <tr className='flex flex-row gap-2'>
                          <td className='font-bold'>Weight</td>
                          <td>{TransformGtoKG(data.weight)} kg</td>
                        </tr>
                      </tbody>
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
                </div>
              </div>
            </>
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetails;
