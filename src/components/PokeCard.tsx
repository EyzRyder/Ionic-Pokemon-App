import { Link } from 'react-router-dom';
import './ExploreContainer.scss';
import { getIdFromUrl } from '../services/helpers';

interface PokeCardProps {
  name: string;
  url: string;
}

const PokeCard: React.FC<PokeCardProps> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 px-9 py-8 bg-slate-300 shadow-md w-48 rounded-lg ">
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${getIdFromUrl(props.url)}.png`} alt={props.name} />
      <h2 className='text-gray-600 text-xl text-center flex flex-col font-semibold'>
        {props.name}
        <span> #{getIdFromUrl(props.url)}</span>
      </h2>
      <Link to={`pokemon/${getIdFromUrl(props.url)}`} className='bg-secondary-default hover:bg-secondary-shade hover:scale-[1.2] transition-all py-2 px-3 rounded-md'> Ver </Link>
    </div>
  );
};

export default PokeCard;
