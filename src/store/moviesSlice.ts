import { createSlice, createAsyncThunk, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchPopularMarvelMovies,
  searchMovies as searchMoviesService,
  fetchMovieDetails,
  fetchGenres,
} from '../services/tmdbService';
import { MoviesStatus } from '../utils/enums';
import type { Movie, MovieDetails } from '../types/movie';
import type { PartialFilters } from '../utils/moviesFilters';

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  genres: Genre[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  status: MoviesStatus;
  error: string | null;
  searchQuery: string;
  selectedGenreId: number | null;
  selectedYear: number | null;
  selectedRating: number | null;
}

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

// Async thunks

export const fetchPopularMovies = createAsyncThunk<
  Movie[],
  number,
  { state: { movies: MoviesState }; rejectValue: string }
>('movies/fetchPopularMovies', async (page, { getState, rejectWithValue }) => {
  try {
    const { movies: moviesState } = getState();
    const moviesData = await fetchPopularMarvelMovies(page, moviesState.genres);
    return moviesData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load popular movies';
    return rejectWithValue(errorMessage);
  }
});

export const fetchMorePopularMovies = createAsyncThunk<
  Movie[],
  number,
  { state: { movies: MoviesState }; rejectValue: string }
>('movies/fetchMorePopularMovies', async (page, { getState, rejectWithValue }) => {
  try {
    const { movies: moviesState } = getState();
    const moviesData = await fetchPopularMarvelMovies(page, moviesState.genres);
    return moviesData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load more movies';
    return rejectWithValue(errorMessage);
  }
});

export const searchMovies = createAsyncThunk<
  Movie[],
  { query: string; page: number },
  { state: { movies: MoviesState }; rejectValue: string }
>('movies/searchMovies', async ({ query, page }, { getState, rejectWithValue }) => {
  try {
    const { movies: moviesState } = getState();
    const moviesData = await searchMoviesService(
      query,
      page,
      moviesState.selectedYear || undefined,
      moviesState.selectedRating || undefined,
      moviesState.selectedGenreId || undefined,
      moviesState.genres,
    );
    return moviesData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to search movies';
    return rejectWithValue(errorMessage);
  }
});

export const fetchMovieDetailsThunk = createAsyncThunk<
  MovieDetails | null,
  number,
  { rejectValue: string }
>('movies/fetchMovieDetails', async (id, { rejectWithValue }) => {
  try {
    const movieDetails = await fetchMovieDetails(id);
    return movieDetails;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load movie details';
    return rejectWithValue(errorMessage);
  }
});

export const fetchGenresThunk = createAsyncThunk<Genre[], void, { rejectValue: string }>(
  'movies/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const genresData = await fetchGenres();
      return genresData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load genres';
      return rejectWithValue(errorMessage);
    }
  },
);

// Helper functions for common reducer logic

const handleMoviesListFulfilled = (state: MoviesState, action: PayloadAction<Movie[]>) => {
  state.movies = action.payload;
  state.status = MoviesStatus.Succeeded;
};

const handleMoreMoviesFulfilled = (state: MoviesState, action: PayloadAction<Movie[]>) => {
  // Deduplicate: create a Set of existing IDs, then filter out duplicates
  const existingIds = new Set(state.movies.map((m) => m.id));
  const newMovies = action.payload.filter((m) => !existingIds.has(m.id));
  state.movies = [...state.movies, ...newMovies];
  state.currentPage += 1;
  state.hasMore = state.currentPage < state.totalPages;
  state.status = MoviesStatus.Succeeded;
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
  },
  extraReducers: (builder) => {
    // Handle all pending thunks
    builder.addMatcher(
      isAnyOf(
        fetchGenresThunk.pending,
        fetchPopularMovies.pending,
        fetchMorePopularMovies.pending,
        searchMovies.pending,
        fetchMovieDetailsThunk.pending,
      ),
      (state) => {
        state.status = MoviesStatus.Loading;
        state.error = null;
      },
    );

    // Handle all rejected thunks
    builder.addMatcher(
      isAnyOf(
        fetchGenresThunk.rejected,
        fetchPopularMovies.rejected,
        fetchMorePopularMovies.rejected,
        searchMovies.rejected,
        fetchMovieDetailsThunk.rejected,
      ),
      (state, action) => {
        state.status = MoviesStatus.Failed;
        state.error = action.payload || 'Request failed';
      },
    );

    // Fulfilled handlers with specific logic
    builder.addCase(fetchGenresThunk.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.status = MoviesStatus.Succeeded;
    });

    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      handleMoviesListFulfilled(state, action);
      state.currentPage = 1;
      const calculatedTotalPages = Math.ceil(500 / 20);
      state.totalPages = calculatedTotalPages;
      state.hasMore = 1 < calculatedTotalPages;
    });

    builder.addCase(fetchMorePopularMovies.fulfilled, (state, action) => {
      handleMoreMoviesFulfilled(state, action);
    });

    builder.addCase(searchMovies.fulfilled, (state, action) => {
      handleMoviesListFulfilled(state, action);
    });

    builder.addCase(fetchMovieDetailsThunk.fulfilled, (state, action) => {
      state.selectedMovie = action.payload;
      state.status = MoviesStatus.Succeeded;
    });
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
} = moviesSlice.actions;
