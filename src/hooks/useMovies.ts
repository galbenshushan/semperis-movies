import { useContext } from 'react';
import { MoviesContext, type MoviesContextValue } from '../context/MoviesContext';

export const useMovies = (): MoviesContextValue => {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }

  return context;
};
