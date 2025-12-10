import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi, describe, test, beforeEach, expect } from 'vitest';
import { useMoviesStore } from './useMoviesStore';
import { moviesReducer } from '../store/moviesSlice';
import { MoviesStatus } from '../utils/enums';

// Mock the TMDB service
vi.mock('../services/tmdb', () => ({
  fetchPopularMarvelMovies: vi.fn(),
  fetchGenres: vi.fn(),
  searchMovies: vi.fn(),
  fetchMovieDetails: vi.fn(),
}));

import * as tmdbService from '../services/tmdb';

const mockFetchPopularMarvelMovies = tmdbService.fetchPopularMarvelMovies as ReturnType<typeof vi.fn>;
const mockFetchGenres = tmdbService.fetchGenres as ReturnType<typeof vi.fn>;

const createMockStore = () => {
  return configureStore({
    reducer: {
      movies: moviesReducer,
    },
  });
};

const renderHookWithProvider = (hook: () => ReturnType<typeof useMoviesStore>) => {
  const store = createMockStore();
  return renderHook(hook, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    ),
  });
};

describe('useMoviesStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loadPopularMovies sets status to Loading then Succeeded', async () => {
    const mockMovies = [
      { id: 1, title: 'Iron Man', releaseDate: '2008-05-02', posterPath: '/path.jpg', voteAverage: 7.9 },
    ];

    mockFetchGenres.mockResolvedValue([{ id: 28, name: 'Action' }]);
    mockFetchPopularMarvelMovies.mockResolvedValue(mockMovies);

    const { result } = renderHookWithProvider(() => useMoviesStore());

    // Initial status should be Idle
    expect(result.current.status).toBe(MoviesStatus.Idle);

    // Call loadPopularMovies
    await act(async () => {
      await result.current.loadPopularMovies(1);
    });

    // After resolution, status should be Succeeded
    expect(result.current.status).toBe(MoviesStatus.Succeeded);
  });

  test('loadPopularMovies stores movies after resolving', async () => {
    const mockMovies = [
      { id: 1, title: 'Iron Man', releaseDate: '2008-05-02', posterPath: '/path.jpg', voteAverage: 7.9 },
      { id: 2, title: 'The Avengers', releaseDate: '2012-05-04', posterPath: '/path.jpg', voteAverage: 8.0 },
    ];

    mockFetchGenres.mockResolvedValue([{ id: 28, name: 'Action' }]);
    mockFetchPopularMarvelMovies.mockResolvedValue(mockMovies);

    const { result } = renderHookWithProvider(() => useMoviesStore());

    await act(async () => {
      await result.current.loadPopularMovies(1);
    });

    expect(result.current.movies).toHaveLength(2);
    expect(result.current.movies[0].title).toBe('Iron Man');
    expect(result.current.movies[1].title).toBe('The Avengers');
  });
});
