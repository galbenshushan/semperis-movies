import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Base selectors - only meaningful ones
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectSelectedMovie = (state: RootState) => state.movies.selectedMovie;

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
export const selectFilteredMovies = createSelector(
  [selectMovies, selectFilters],
  (movies, { selectedGenreId, selectedYear, selectedRating }) =>
    movies.filter((movie) => {
      const matchGenre =
        selectedGenreId === null || movie.genres?.some((g) => g.id === selectedGenreId);

      const matchYear = !selectedYear || new Date(movie.releaseDate).getFullYear() === selectedYear;

      const matchRating = !selectedRating || movie.voteAverage >= selectedRating;

      return matchGenre && matchYear && matchRating;
    }),
);
