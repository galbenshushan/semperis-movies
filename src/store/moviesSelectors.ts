import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Base selectors
export const selectMoviesState = (state: RootState) => state.movies;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectSelectedMovie = (state: RootState) => state.movies.selectedMovie;
export const selectGenres = (state: RootState) => state.movies.genres;
export const selectStatus = (state: RootState) => state.movies.status;
export const selectError = (state: RootState) => state.movies.error;
export const selectCurrentPage = (state: RootState) => state.movies.currentPage;
export const selectTotalPages = (state: RootState) => state.movies.totalPages;
export const selectHasMore = (state: RootState) => state.movies.hasMore;

// Filters object selector (memoized)
export const selectFilters = createSelector(
  [
    (state: RootState) => state.movies.searchQuery,
    (state: RootState) => state.movies.selectedGenreId,
    (state: RootState) => state.movies.selectedYear,
    (state: RootState) => state.movies.selectedRating,
  ],
  (searchQuery, selectedGenreId, selectedYear, selectedRating) => ({
    searchQuery,
    selectedGenreId,
    selectedYear,
    selectedRating,
  }),
);

// Memoized filtered movies selector
// Note: Search filtering is done via API call, not locally.
// Local filtering is only applied for genre, year, and rating.
export const selectFilteredMovies = createSelector(
  [selectMovies, selectFilters],
  (movies, { selectedGenreId, selectedYear, selectedRating }) => {
    let filtered = [...movies];

    // Filter by genre (using genres array if available)
    if (selectedGenreId !== null) {
      filtered = filtered.filter((movie) => {
        if (movie.genres?.some((g) => g.id === selectedGenreId)) {
          return true;
        }
        return false;
      });
    }

    // Filter by year
    if (selectedYear) {
      filtered = filtered.filter((movie) => {
        const movieYear = new Date(movie.releaseDate).getFullYear();
        return movieYear === selectedYear;
      });
    }

    // Filter by minimum rating
    if (selectedRating) {
      filtered = filtered.filter((movie) => movie.voteAverage >= selectedRating);
    }

    return filtered;
  },
);
