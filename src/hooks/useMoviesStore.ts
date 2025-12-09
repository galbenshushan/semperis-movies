import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setSearchQuery,
  setSelectedGenreId,
  setSelectedYear,
  setSelectedRating,
  clearSearch,
  setSelectedMovie,
  updateFilters,
  setMovies,
  appendMovies,
  setGenres,
  setStatus,
  setError,
  setPagination,
} from '../store/moviesSlice';
import {
  fetchPopularMarvelMovies,
  searchMovies as searchMoviesService,
  fetchMovieDetails,
  fetchGenres,
} from '../services/tmdbService';
import * as selectors from '../store/moviesSelectors';
import { MoviesStatus } from '../utils/enums';
import type { MovieDetails } from '../types/movie';
import type { PartialFilters } from '../types/filters';

/**
 * Thin facade over Redux state and actions for movies.
 * Handles all Redux state selection and dispatches.
 * Performs async TMDB calls directly (not via thunks).
 * No side effects (useEffect) - this is a stateless hook.
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

  /**
   * Load popular Marvel movies for a given page.
   * Fetches genres if not already loaded.
   */
  const loadPopularMovies = useCallback(
    async (page: number = 1) => {
      try {
        dispatch(setStatus(MoviesStatus.Loading));
        dispatch(setError(null));

        // Fetch genres if not already loaded
        let currentGenres = genres;
        if (currentGenres.length === 0) {
          const genresData = await fetchGenres();
          currentGenres = genresData;
          dispatch(setGenres(genresData));
        }

        // Fetch popular movies
        const moviesData = await fetchPopularMarvelMovies(page, currentGenres);
        dispatch(setMovies(moviesData));

        // Calculate pagination
        const calculatedTotalPages = Math.ceil(500 / 20);
        dispatch(
          setPagination({
            currentPage: 1,
            totalPages: calculatedTotalPages,
            hasMore: 1 < calculatedTotalPages,
          }),
        );

        dispatch(setStatus(MoviesStatus.Succeeded));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load popular movies';
        dispatch(setError(errorMessage));
        dispatch(setStatus(MoviesStatus.Failed));
      }
    },
    [dispatch, genres],
  );

  const loadMorePopularMovies = useCallback(async () => {
    try {
      if (status === MoviesStatus.Loading || !hasMore) {
        return;
      }

      dispatch(setStatus(MoviesStatus.Loading));
      dispatch(setError(null));

      const nextPage = currentPage + 1;
      const moviesData = await fetchPopularMarvelMovies(nextPage, genres);
      dispatch(appendMovies(moviesData));

      dispatch(
        setPagination({
          currentPage: nextPage,
          totalPages,
          hasMore: nextPage < totalPages,
        }),
      );

      dispatch(setStatus(MoviesStatus.Succeeded));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load more movies';
      dispatch(setError(errorMessage));
      dispatch(setStatus(MoviesStatus.Failed));
    }
  }, [dispatch, status, hasMore, currentPage, genres, totalPages]);

  /**
   * Search movies by query and filters.
   * Resets pagination to page 1.
   */
  const searchMovies = useCallback(
    async (page: number = 1) => {
      try {
        dispatch(setStatus(MoviesStatus.Loading));
        dispatch(setError(null));

        const moviesData = await searchMoviesService(
          filters.searchQuery,
          page,
          filters.selectedYear || undefined,
          filters.selectedRating || undefined,
          filters.selectedGenreId || undefined,
          genres,
        );

        dispatch(setMovies(moviesData));

        // Reset pagination for search results
        dispatch(
          setPagination({
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
          }),
        );

        dispatch(setStatus(MoviesStatus.Succeeded));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to search movies';
        dispatch(setError(errorMessage));
        dispatch(setStatus(MoviesStatus.Failed));
      }
    },
    [dispatch, filters, genres],
  );

  /**
   * Load movie details by ID.
   */
  const loadMovieDetails = useCallback(
    async (id: number) => {
      try {
        dispatch(setStatus(MoviesStatus.Loading));
        dispatch(setError(null));

        const details = await fetchMovieDetails(id);
        dispatch(setSelectedMovie(details));
        dispatch(setStatus(MoviesStatus.Succeeded));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load movie details';
        dispatch(setError(errorMessage));
        dispatch(setStatus(MoviesStatus.Failed));
      }
    },
    [dispatch],
  );

  // Sync filter setters
  const setSearchQueryHandler = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch],
  );

  const setSelectedGenreIdHandler = useCallback(
    (genreId: number | null) => {
      dispatch(setSelectedGenreId(genreId));
    },
    [dispatch],
  );

  const setSelectedYearHandler = useCallback(
    (year: number | null) => {
      dispatch(setSelectedYear(year));
    },
    [dispatch],
  );

  const setSelectedRatingHandler = useCallback(
    (rating: number | null) => {
      dispatch(setSelectedRating(rating));
    },
    [dispatch],
  );

  const setSelectedMovieHandler = useCallback(
    (movie: MovieDetails | null) => {
      dispatch(setSelectedMovie(movie));
    },
    [dispatch],
  );

  const clearSearchHandler = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  const updateFiltersHandler = useCallback(
    (partialFilters: PartialFilters) => {
      dispatch(updateFilters(partialFilters));
    },
    [dispatch],
  );

  return useMemo(() => {
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

      // Async actions
      loadPopularMovies,
      loadMorePopularMovies,
      searchMovies,
      loadMovieDetails,

      // Sync actions
      setSearchQuery: setSearchQueryHandler,
      setSelectedGenreId: setSelectedGenreIdHandler,
      setSelectedYear: setSelectedYearHandler,
      setSelectedRating: setSelectedRatingHandler,
      setSelectedMovie: setSelectedMovieHandler,
      updateFilters: updateFiltersHandler,
      clearSearch: clearSearchHandler,
    };
  }, [
    // Only include primitives and small arrays
    movies.length,
    filteredMovies.length,
    selectedMovie?.id,
    genres.length,
    status,
    error,
    currentPage,
    totalPages,
    hasMore,
    filters.searchQuery,
    filters.selectedGenreId,
    filters.selectedYear,
    filters.selectedRating,
    loadPopularMovies,
    loadMorePopularMovies,
    searchMovies,
    loadMovieDetails,
    setSearchQueryHandler,
    setSelectedGenreIdHandler,
    setSelectedYearHandler,
    setSelectedRatingHandler,
    setSelectedMovieHandler,
    updateFiltersHandler,
    clearSearchHandler,
  ]);
};

export type MoviesStore = ReturnType<typeof useMoviesStore>;
