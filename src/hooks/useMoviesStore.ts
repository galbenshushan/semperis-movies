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
  setConfigError,
  setPagination,
} from '../store/moviesSlice';
import {
  fetchPopularMarvelMovies,
  searchMovies as searchMoviesService,
  fetchMovieDetails,
  fetchGenres,
} from '../services/tmdb';
import * as selectors from '../store/moviesSelectors';
import { MoviesStatus } from '../utils/enums';
import { toErrorMessage } from '../utils/errorHandling';
import type { MovieDetails } from '../types/movie';
import type { PartialFilters } from '../types/filters';

/**
 * Thin facade over Redux state and actions for movies.
 * - Selects all relevant state from the store.
 * - Provides async helpers that talk to TMDB services and update Redux.
 * - Provides sync helpers that wrap dispatch for filter and selection changes.
 *
 * This hook itself is stateless and contains no effects.
 */
export const useMoviesStore = () => {
  const dispatch = useAppDispatch();

  // State selection
  const movies = useAppSelector(selectors.selectMovies);
  const filteredMovies = useAppSelector(selectors.selectFilteredMovies);
  const selectedMovie = useAppSelector(selectors.selectSelectedMovie);
  const genres = useAppSelector(selectors.selectGenres);
  const status = useAppSelector(selectors.selectStatus);
  const error = useAppSelector(selectors.selectError);
  const configError = useAppSelector((state) => state.movies.configError);
  const currentPage = useAppSelector(selectors.selectCurrentPage);
  const totalPages = useAppSelector(selectors.selectTotalPages);
  const hasMore = useAppSelector(selectors.selectHasMore);
  const filters = useAppSelector(selectors.selectFilters);

  /**
   * Calculates pagination for the popular movies flow.
   * TMDB discover endpoint usually caps results. Here we assume 500 max results
   * with 20 items per page, which yields 25 pages total.
   * This can be adjusted later if the API usage changes.
   */
  const calculatePopularPagination = (page: number) => {
    const maxResults = 500;
    const pageSize = 20;
    const total = Math.ceil(maxResults / pageSize);

    return {
      currentPage: page,
      totalPages: total,
      hasMore: page < total,
    };
  };

  /**
   * Load popular Marvel movies for a given page.
   * Fetches genres once and reuses them.
   */
  const loadPopularMovies = useCallback(
    async (page: number = 1) => {
      dispatch(setStatus(MoviesStatus.Loading));
      dispatch(setError(null));

      try {
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

        // Pagination for popular list
        dispatch(setPagination(calculatePopularPagination(page)));

        dispatch(setStatus(MoviesStatus.Succeeded));
      } catch (err) {
        const errorMsg = toErrorMessage(err, 'Failed to load popular movies');
        if (err instanceof Error && err.message === 'TMDB_CONFIG_ERROR') {
          dispatch(
            setConfigError(
              'TMDB API key is missing or invalid. Please set VITE_TMDB_API_KEY in your environment variables.',
            ),
          );
        } else {
          dispatch(setError(errorMsg));
        }
        dispatch(setStatus(MoviesStatus.Failed));
      }
    },
    [dispatch, genres],
  );

  /**
   * Load the next page of popular Marvel movies and append to the list.
   */
  const loadMorePopularMovies = useCallback(async () => {
    if (status === MoviesStatus.Loading || !hasMore) {
      return;
    }

    dispatch(setStatus(MoviesStatus.Loading));
    dispatch(setError(null));

    try {
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
      const errorMsg = toErrorMessage(err, 'Failed to load more movies');
      if (err instanceof Error && err.message === 'TMDB_CONFIG_ERROR') {
        dispatch(
          setConfigError(
            'TMDB API key is missing or invalid. Please set VITE_TMDB_API_KEY in your environment variables.',
          ),
        );
      } else {
        dispatch(setError(errorMsg));
      }
      dispatch(setStatus(MoviesStatus.Failed));
    }
  }, [dispatch, status, hasMore, currentPage, genres, totalPages]);

  /**
   * Search movies by current filters.
   * Resets pagination to a single page of results.
   * The actual search logic (query, year, rating, genre) is handled by the service.
   */
  const searchMovies = useCallback(
    async (page: number = 1) => {
      dispatch(setStatus(MoviesStatus.Loading));
      dispatch(setError(null));

      try {
        const moviesData = await searchMoviesService(
          filters.searchQuery,
          page,
          filters.selectedYear || undefined,
          filters.selectedRating || undefined,
          filters.selectedGenreId || undefined,
          genres,
        );

        dispatch(setMovies(moviesData));

        // For search results we currently treat it as a single page set.
        // If needed, this can be extended later to real server side pagination.
        dispatch(
          setPagination({
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
          }),
        );

        dispatch(setStatus(MoviesStatus.Succeeded));
      } catch (err) {
        const errorMsg = toErrorMessage(err, 'Failed to search movies');
        if (err instanceof Error && err.message === 'TMDB_CONFIG_ERROR') {
          dispatch(
            setConfigError(
              'TMDB API key is missing or invalid. Please set VITE_TMDB_API_KEY in your environment variables.',
            ),
          );
        } else {
          dispatch(setError(errorMsg));
        }
        dispatch(setStatus(MoviesStatus.Failed));
      }
    },
    [dispatch, filters, genres],
  );

  /**
   * Load movie details by TMDB ID.
   */
  const loadMovieDetails = useCallback(
    async (id: number) => {
      dispatch(setStatus(MoviesStatus.Loading));
      dispatch(setError(null));

      try {
        const details = await fetchMovieDetails(id);
        dispatch(setSelectedMovie(details));
        dispatch(setStatus(MoviesStatus.Succeeded));
      } catch (err) {
        const errorMsg = toErrorMessage(err, 'Failed to load movie details');
        if (err instanceof Error && err.message === 'TMDB_CONFIG_ERROR') {
          dispatch(
            setConfigError(
              'TMDB API key is missing or invalid. Please set VITE_TMDB_API_KEY in your environment variables.',
            ),
          );
        } else {
          dispatch(setError(errorMsg));
        }
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

  /**
   * Public API of the hook.
   * useMemo is used to keep a stable reference object and avoid unnecessary re renders.
   * Dependencies are kept small (mostly primitives and IDs) to avoid over sensitivity.
   */
  return useMemo(
    () => ({
      // State
      movies,
      filteredMovies,
      selectedMovie,
      genres,
      status,
      error,
      configError,
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
    }),
    [
      // State dependencies
      movies.length,
      filteredMovies.length,
      selectedMovie?.id,
      genres.length,
      status,
      error,
      configError,
      currentPage,
      totalPages,
      hasMore,
      filters.searchQuery,
      filters.selectedGenreId,
      filters.selectedYear,
      filters.selectedRating,

      // Handlers
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
    ],
  );
};

export type MoviesStore = ReturnType<typeof useMoviesStore>;
