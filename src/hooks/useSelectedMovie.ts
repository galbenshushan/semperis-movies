import { useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMoviesListPage } from './useMoviesListPage';
import { MoviesStatus } from '../utils/enums';
import type { CastMember, MovieDetails } from '../types/movie';

export interface UseSelectedMovieReturn {
  selectedMovie: ReturnType<typeof useMoviesListPage>['selectedMovie'];
  status: MoviesStatus;
  error: string | null;
  posterUrl: string | null;
  backdropUrl: string | undefined;
  releaseYear: number | null;
  formattedReleaseDate: string | null;
  director: string | null;
  cast: CastMember[];
  handleBack: () => void;
  handleGoHome: () => void;
  handleOpenTMDB: () => void;
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
}

/**
 * Custom hook that encapsulates all business logic for the MovieDetailsPage.
 * Handles loading movie details, computing derived values, and exposing memoized handlers.
 */
export const useSelectedMovie = (): UseSelectedMovieReturn => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const storeReturn = useMoviesListPage();
  const { selectedMovie, status, error, loadMovieDetails, setSelectedMovie } = storeReturn;

  // Wrap loadMovieDetails and setSelectedMovie with useCallback to stabilize them
  // This prevents the useEffect below from re-running unnecessarily
  const memoizedLoadMovieDetails = useCallback(
    (id: number) => {
      return loadMovieDetails(id);
    },
    [loadMovieDetails],
  );

  const memoizedSetSelectedMovie = useCallback(
    (movie: MovieDetails | null) => {
      return setSelectedMovie(movie);
    },
    [setSelectedMovie],
  );

  // Load movie details on mount or when id changes, clear on unmount
  useEffect(() => {
    if (id) {
      memoizedLoadMovieDetails(Number(id));
    }

    // Cleanup: clear selectedMovie when component unmounts
    return () => {
      memoizedSetSelectedMovie(null);
    };
  }, [id, memoizedLoadMovieDetails, memoizedSetSelectedMovie]);

  // Memoized event handlers
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleOpenTMDB = useCallback(() => {
    if (selectedMovie) {
      window.open(`https://www.themoviedb.org/movie/${selectedMovie.id}`, '_blank');
    }
  }, [selectedMovie?.id]);

  // Memoized computed values
  const posterUrl = useMemo(
    () =>
      selectedMovie?.posterPath
        ? `https://image.tmdb.org/t/p/w500${selectedMovie.posterPath}`
        : null,
    [selectedMovie?.posterPath],
  );

  const backdropUrl = useMemo(
    () =>
      selectedMovie
        ? selectedMovie.backdropPath
          ? `https://image.tmdb.org/t/p/w1280${selectedMovie.backdropPath}`
          : undefined
        : undefined,
    [selectedMovie?.backdropPath],
  );

  const releaseYear = useMemo(
    () => (selectedMovie ? new Date(selectedMovie.releaseDate).getFullYear() : null),
    [selectedMovie?.releaseDate],
  );

  const formattedReleaseDate = useMemo(
    () =>
      selectedMovie
        ? new Date(selectedMovie.releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : null,
    [selectedMovie?.releaseDate],
  );

  const director = useMemo(() => selectedMovie?.director || null, [selectedMovie?.director]);

  const cast = useMemo(() => selectedMovie?.cast || [], [selectedMovie?.cast]);

  // Convenience state flags - computed directly without useMemo to avoid circular deps
  const isLoading = !selectedMovie || status === MoviesStatus.Loading;
  const isError = status === MoviesStatus.Failed && !!error;
  const isNotFound = status === MoviesStatus.Succeeded && !selectedMovie && !!id && !error;

  // Memoize the entire return object to ensure stable reference and prevent unnecessary re-renders
  // Dependencies: id, selectedMovie.id, status, error - the things that truly determine the page state
  const returnValue = useMemo(() => {
    return {
      selectedMovie,
      status,
      error,
      posterUrl,
      backdropUrl,
      releaseYear,
      formattedReleaseDate,
      director,
      cast,
      handleBack,
      handleGoHome,
      handleOpenTMDB,
      isLoading,
      isError,
      isNotFound,
    };
  }, [id, selectedMovie?.id, status, error]);

  return returnValue;
};
