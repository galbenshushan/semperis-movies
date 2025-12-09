import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchPopularMovies,
  fetchMorePopularMovies,
  searchMovies,
  fetchMovieDetailsThunk,
  fetchGenresThunk,
  setSearchQuery,
  setSelectedGenreId,
  setSelectedYear,
  setSelectedRating,
  clearSearch,
  setSelectedMovie,
  updateFilters,
} from '../store/moviesSlice';
import * as selectors from '../store/moviesSelectors';
import type { MovieDetails } from '../types/movie';
import type { PartialFilters } from '../types/filters';

/**
 * Thin facade over Redux state and actions for movies.
 * Only selects data and exposes typed action dispatchers.
 * No side effects (useEffect) here - this is a pure data + actions hook.
 */
export const useMoviesStore = () => {
  const dispatch = useAppDispatch();

  // Select all state
  const movies = useAppSelector(selectors.selectMovies);
  const filteredMovies = useAppSelector(selectors.selectFilteredMovies);
  const selectedMovie = useAppSelector(selectors.selectSelectedMovie);
  const genres = useAppSelector(selectors.selectGenres);
  const status = useAppSelector(selectors.selectStatus);
  const error = useAppSelector(selectors.selectError);
  const currentPage = useAppSelector(selectors.selectCurrentPage);
  const totalPages = useAppSelector(selectors.selectTotalPages);
  const hasMore = useAppSelector(selectors.selectHasMore);
  const filters = useAppSelector(selectors.selectFilters);

  // Action dispatchers
  const loadPopularMoviesAction = useCallback(
    async (page: number = 1) => {
      if (genres.length === 0) {
        await dispatch(fetchGenresThunk());
      }
      void dispatch(fetchPopularMovies(page));
    },
    [dispatch, genres.length],
  );

  const loadMorePopularMoviesAction = useCallback(
    async (page: number) => {
      void dispatch(fetchMorePopularMovies(page));
    },
    [dispatch],
  );

  const searchMoviesAction = useCallback(
    async (page: number = 1) => {
      void dispatch(searchMovies({ query: filters.searchQuery, page }));
    },
    [dispatch, filters.searchQuery],
  );

  const loadMovieDetailsAction = useCallback(
    async (id: number) => {
      void dispatch(fetchMovieDetailsThunk(id));
    },
    [dispatch],
  );

  const setSearchQueryAction = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch],
  );

  const setSelectedGenreIdAction = useCallback(
    (genreId: number | null) => {
      dispatch(setSelectedGenreId(genreId));
    },
    [dispatch],
  );

  const setSelectedYearAction = useCallback(
    (year: number | null) => {
      dispatch(setSelectedYear(year));
    },
    [dispatch],
  );

  const setSelectedRatingAction = useCallback(
    (rating: number | null) => {
      dispatch(setSelectedRating(rating));
    },
    [dispatch],
  );

  const setSelectedMovieAction = useCallback(
    (movie: MovieDetails | null) => {
      dispatch(setSelectedMovie(movie));
    },
    [dispatch],
  );

  const clearSearchAction = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  const updateFiltersAction = useCallback(
    (partialFilters: PartialFilters) => {
      dispatch(updateFilters(partialFilters));
    },
    [dispatch],
  );

  return {
    // State
    movies,
    filteredMovies,
    selectedMovie,
    genres,
    status,
    error,
    currentPage,
    totalPages,
    hasMore,
    filters,

    // Actions
    loadPopularMovies: loadPopularMoviesAction,
    loadMorePopularMovies: loadMorePopularMoviesAction,
    searchMovies: searchMoviesAction,
    loadMovieDetails: loadMovieDetailsAction,
    updateFilters: updateFiltersAction,
    setSearchQuery: setSearchQueryAction,
    setSelectedGenreId: setSelectedGenreIdAction,
    setSelectedYear: setSelectedYearAction,
    setSelectedRating: setSelectedRatingAction,
    setSelectedMovie: setSelectedMovieAction,
    clearSearch: clearSearchAction,
  };
};

export type MoviesStore = ReturnType<typeof useMoviesStore>;
