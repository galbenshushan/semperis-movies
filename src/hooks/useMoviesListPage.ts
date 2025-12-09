import { useCallback, useEffect, useRef } from 'react';
import { useMoviesStore } from './useMoviesStore';
import { useWindowScroll } from './useWindowScroll';
import { isNearBottom, throttle } from '../utils/scroll';
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
  const {
    movies,
    status,
    hasMore,
    filters,
    loadPopularMovies,
    loadMorePopularMovies,
    searchMovies,
  } = store;

  // Load initial movies on mount
  useEffect(() => {
    if (movies.length === 0) {
      loadPopularMovies(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search query and filters changes - call API instead of filtering only locally
  useEffect(() => {
    const { searchQuery, selectedGenreId, selectedYear, selectedRating } = filters;

    const hasQuery = searchQuery.trim().length > 0;
    const hasAnyFilter =
      selectedGenreId !== null || selectedYear !== null || selectedRating !== null;

    if (hasQuery || hasAnyFilter) {
      // Any search signal (text or filters) – use deep searchMovies
      searchMovies(1);
    } else {
      // No query and no filters – fallback to popular Marvel movies
      loadPopularMovies(1);
    }
  }, [
    filters.searchQuery,
    filters.selectedGenreId,
    filters.selectedYear,
    filters.selectedRating,
    searchMovies,
    loadPopularMovies,
  ]);

  // Throttle delay for scroll events (in milliseconds)
  const SCROLL_THROTTLE_DELAY = 500;

  // Use ref to store the throttled handler to prevent recreation
  const throttledHandlerRef = useRef<(() => void) | null>(null);

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

  // Create throttled handler
  useEffect(() => {
    throttledHandlerRef.current = throttle(handleScroll, SCROLL_THROTTLE_DELAY);
  }, [handleScroll]);

  // Attach scroll listener with throttled handler
  useWindowScroll(() => {
    if (throttledHandlerRef.current) {
      throttledHandlerRef.current();
    }
  });

  return store;
};
