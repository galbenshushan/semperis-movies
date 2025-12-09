/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { fetchPopularMovies, searchMovies, fetchMovieDetails } from '../services/tmdbService';
import { MoviesStatus } from '../utils/enums';
import type { ReactNode } from 'react';
import type { Movie, MovieDetails, MoviesFilters } from '../types/movie';

export interface MoviesState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  filters: MoviesFilters;
  status: MoviesStatus;
  error: string | null;
}

export interface MoviesContextValue extends MoviesState {
  loadPopularMovies: (page?: number) => Promise<void>;
  searchMovies: (page?: number) => Promise<void>;
  loadMovieDetails: (id: number) => Promise<void>;
  updateFilters: (partialFilters: Partial<MoviesFilters>) => void;
}

export const MoviesContext = createContext<MoviesContextValue | undefined>(undefined);

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [filters, setFilters] = useState<MoviesFilters>({});
  const [status, setStatus] = useState<MoviesStatus>(MoviesStatus.Idle);
  const [error, setError] = useState<string | null>(null);

  const loadPopularMovies = async (page: number = 1) => {
    try {
      setStatus(MoviesStatus.Loading);
      setError(null);
      const moviesData = await fetchPopularMovies(page);
      setMovies(moviesData);
      setStatus(MoviesStatus.Succeeded);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load popular movies';
      setError(errorMessage);
      setStatus(MoviesStatus.Failed);
    }
  };

  const handleSearchMovies = async (page: number = 1) => {
    try {
      setStatus(MoviesStatus.Loading);
      setError(null);

      const moviesData = await searchMovies(
        filters.query || '',
        page,
        filters.year,
        filters.minRating,
        filters.genreId,
      );

      setMovies(moviesData);
      setStatus(MoviesStatus.Succeeded);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search movies';
      setError(errorMessage);
      setStatus(MoviesStatus.Failed);
    }
  };

  const loadMovieDetails = async (id: number) => {
    try {
      setStatus(MoviesStatus.Loading);
      setError(null);
      const movieDetails = await fetchMovieDetails(id);
      setSelectedMovie(movieDetails);
      setStatus(MoviesStatus.Succeeded);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load movie details';
      setError(errorMessage);
      setStatus(MoviesStatus.Failed);
    }
  };

  const updateFilters = (partialFilters: Partial<MoviesFilters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...partialFilters }));
  };

  const value: MoviesContextValue = {
    movies,
    selectedMovie,
    filters,
    status,
    error,
    loadPopularMovies,
    searchMovies: handleSearchMovies,
    loadMovieDetails,
    updateFilters,
  };

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
};
