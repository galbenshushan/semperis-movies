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
  searchQuery: '',
  selectedGenreId: null,
  selectedYear: null,
  selectedRating: null,
};

// Slice

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedGenreId: (state, action: PayloadAction<number | null>) => {
      state.selectedGenreId = action.payload;
    },
    setSelectedYear: (state, action: PayloadAction<number | null>) => {
      state.selectedYear = action.payload;
    },
    setSelectedRating: (state, action: PayloadAction<number | null>) => {
      state.selectedRating = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
    },
    setSelectedMovie: (state, action: PayloadAction<MovieDetails | null>) => {
      state.selectedMovie = action.payload;
    },
    resetMovies: (state) => {
      state.movies = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    updateFilters: (state, action: PayloadAction<PartialFilters>) => {
      const { query, year, minRating, genreId } = action.payload;
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
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    appendMovies: (state, action: PayloadAction<Movie[]>) => {
      const existingIds = new Set(state.movies.map((m) => m.id));
      const newMovies = action.payload.filter((m) => !existingIds.has(m.id));
      state.movies = [...state.movies, ...newMovies];
    },
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
    setStatus: (state, action: PayloadAction<MoviesStatus>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<{
        currentPage: number;
        totalPages: number;
        hasMore: boolean;
      }>,
    ) => {
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.hasMore = action.payload.hasMore;
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
  setPagination,
} = moviesSlice.actions;
