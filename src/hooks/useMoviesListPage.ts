import { useCallback, useEffect } from 'react';
import { useMoviesStore } from './useMoviesStore';
import { useWindowScroll } from './useWindowScroll';
import { isNearBottom } from '../utils/scroll';
import { MoviesStatus } from '../utils/enums';

/**
 * Hook for the movies list page that adds side effects on top of useMoviesStore.
 * Handles:
 * - Initial load of movies on mount
 * - Infinite scroll to load more movies
 */
export const useMoviesListPage = () => {
  const store = useMoviesStore();
  const { movies, status, currentPage, hasMore, loadPopularMovies, loadMorePopularMovies } = store;

  // Load initial movies on mount
  useEffect(() => {
    if (movies.length === 0) {
      void loadPopularMovies(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    // Only load more if:
    // - We're not already loading
    // - There are more pages
    // - We're within 300px of the bottom
    if (status !== MoviesStatus.Loading && hasMore && isNearBottom(300)) {
      void loadMorePopularMovies(currentPage + 1);
    }
  }, [status, hasMore, currentPage, loadMorePopularMovies]);

  // Attach scroll listener
  useWindowScroll(handleScroll);

  return store;
};
