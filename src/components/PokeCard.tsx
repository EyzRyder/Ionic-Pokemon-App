import { Link } from 'react-router-dom';
import './ExploreContainer.scss';
import { getIdFromUrl } from '../services/helpers';

interface PokeCardProps { 
  name: string;
  url: string;
}

const PokeCard: React.FC<PokeCardProps> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 px-9 py-8 bg-slate-600 w-48 rounded-lg ">
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${getIdFromUrl(props.url)}.png`} alt={props.name} />
      <h2 className='text-primary-default font-semibold'>
        {props.name}
        <span> #{getIdFromUrl(props.url)}</span>
      </h2>
      <Link to={`pokemon/${getIdFromUrl(props.url)}`} className='bg-tertiary-default py-2 px-3 rounded-md'> Ver </Link>
    </div>
  );
};

export default PokeCard;
