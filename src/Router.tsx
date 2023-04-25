import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={ <Home/>} />
      <Route path='pokemon/:id' element={<PokemonDetails />} />
    </Route>
  )
);