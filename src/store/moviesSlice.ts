import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { MoviesStatus } from '../utils/enums';
import type { Movie, MovieDetails } from '../types/movie';
import type { PartialFilters } from '../types/filters';
import type { Genre, MoviesState } from './moviesTypes';

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  genres: [],
  currentPage: 1,
  totalPages: 1,
  hasMore: true,
  status: MoviesStatus.Idle,
  error: null,
  configError: null,
  searchQuery: '',
  selectedGenreId: null,
  selectedYear: null,
  selectedRating: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    setSelectedGenreId: (state, { payload }: PayloadAction<number | null>) => {
      state.selectedGenreId = payload;
    },
    setSelectedYear: (state, { payload }: PayloadAction<number | null>) => {
      state.selectedYear = payload;
    },
    setSelectedRating: (state, { payload }: PayloadAction<number | null>) => {
      state.selectedRating = payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
    },
    setSelectedMovie: (state, { payload }: PayloadAction<MovieDetails | null>) => {
      state.selectedMovie = payload;
    },
    resetMovies: (state) => {
      state.movies = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    updateFilters: (state, { payload }: PayloadAction<PartialFilters>) => {
      const { query, year, minRating, genreId } = payload;

      if (query !== undefined) {
        state.searchQuery = query;
      }
      if (genreId !== undefined) {
        state.selectedGenreId = genreId;
      }
      if (year !== undefined) {
        state.selectedYear = year;
      }
      if (minRating !== undefined) {
        state.selectedRating = minRating;
      }
    },
    setMovies: (state, { payload }: PayloadAction<Movie[]>) => {
      state.movies = payload;
    },
    appendMovies: (state, { payload }: PayloadAction<Movie[]>) => {
      const existingIds = new Set(state.movies.map((m) => m.id));
      const newMovies = payload.filter((m) => !existingIds.has(m.id));
      state.movies.push(...newMovies);
    },
    setGenres: (state, { payload }: PayloadAction<Genre[]>) => {
      state.genres = payload;
    },
    setStatus: (state, { payload }: PayloadAction<MoviesStatus>) => {
      state.status = payload;
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
    setConfigError: (state, { payload }: PayloadAction<string | null>) => {
      state.configError = payload;
    },
    setPagination: (
      state,
      { payload }: PayloadAction<{ currentPage: number; totalPages: number; hasMore: boolean }>,
    ) => {
      state.currentPage = payload.currentPage;
      state.totalPages = payload.totalPages;
      state.hasMore = payload.hasMore;
    },
  },
});

export const moviesReducer = moviesSlice.reducer;
export const {
  setSearchQuery,
  setSelectedGenreId,
  setSelectedYear,
  setSelectedRating,
  clearSearch,
  setSelectedMovie,
  resetMovies,
  updateFilters,
  setMovies,
  appendMovies,
  setGenres,
  setStatus,
  setError,
  setConfigError,
  setPagination,
} = moviesSlice.actions;
