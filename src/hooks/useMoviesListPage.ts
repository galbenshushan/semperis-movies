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
 * - Search API calls when search query changes
 */
export const useMoviesListPage = () => {
  const store = useMoviesStore();
  const { movies, status, hasMore, filters, loadPopularMovies, loadMorePopularMovies, searchMovies } = store;

  // Load initial movies on mount
  useEffect(() => {
    if (movies.length === 0) {
      loadPopularMovies(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search query changes - call API instead of filtering locally
  useEffect(() => {
    const { searchQuery } = filters;
    
    if (searchQuery.trim()) {
      // User has entered a search query, fetch results from API
      searchMovies(1);
    } else {
      // No search query, show popular movies
      loadPopularMovies(1);
    }
  }, [filters.searchQuery, searchMovies, loadPopularMovies]);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    // Only load more if:
    // - We're not already loading
    // - There are more pages
    // - We're within 300px of the bottom
    if (status !== MoviesStatus.Loading && hasMore && isNearBottom(300)) {
      loadMorePopularMovies();
    }
  }, [status, hasMore, loadMorePopularMovies]);

  // Attach scroll listener
  useWindowScroll(handleScroll);

  return store;
};
