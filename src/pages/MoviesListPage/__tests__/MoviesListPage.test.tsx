import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, beforeEach, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { MoviesListPage } from '../MoviesListPage';
import { moviesReducer } from '../../../store/moviesSlice';
import { MoviesStatus } from '../../../utils/enums';
import type { Movie } from '../../../types/movie';

// Mock the custom hook
vi.mock('../../../hooks/useMoviesListPage', () => ({
  useMoviesListPage: vi.fn(),
}));

// Mock navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

import { useMoviesListPage } from '../../../hooks/useMoviesListPage';

const mockUseMoviesListPage = useMoviesListPage as ReturnType<typeof vi.fn>;

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      movies: moviesReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('MoviesListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading indicator when status is "Loading"', () => {
    mockUseMoviesListPage.mockReturnValue({
      filteredMovies: [],
      status: MoviesStatus.Loading,
      error: null,
      genres: [],
      filters: { searchQuery: '', selectedGenreId: null, selectedYear: null, selectedRating: null },
      setSearchQuery: vi.fn(),
      clearSearch: vi.fn(),
      setSelectedGenreId: vi.fn(),
      setSelectedYear: vi.fn(),
      setSelectedRating: vi.fn(),
    });

    renderWithProviders(<MoviesListPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders empty state when no movies are available', () => {
    mockUseMoviesListPage.mockReturnValue({
      filteredMovies: [],
      status: MoviesStatus.Succeeded,
      error: null,
      genres: [],
      filters: { searchQuery: '', selectedGenreId: null, selectedYear: null, selectedRating: null },
      setSearchQuery: vi.fn(),
      clearSearch: vi.fn(),
      setSelectedGenreId: vi.fn(),
      setSelectedYear: vi.fn(),
      setSelectedRating: vi.fn(),
    });

    renderWithProviders(<MoviesListPage />);
    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });

  test('renders movie titles when movies are available', () => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: 'Iron Man',
        releaseDate: '2008-05-02',
        posterPath: '/path1.jpg',
        voteAverage: 7.9,
      },
      {
        id: 2,
        title: 'The Avengers',
        releaseDate: '2012-05-04',
        posterPath: '/path2.jpg',
        voteAverage: 8.0,
      },
    ];

    mockUseMoviesListPage.mockReturnValue({
      filteredMovies: mockMovies,
      status: MoviesStatus.Succeeded,
      error: null,
      genres: [],
      filters: { searchQuery: '', selectedGenreId: null, selectedYear: null, selectedRating: null },
      setSearchQuery: vi.fn(),
      clearSearch: vi.fn(),
      setSelectedGenreId: vi.fn(),
      setSelectedYear: vi.fn(),
      setSelectedRating: vi.fn(),
    });

    renderWithProviders(<MoviesListPage />);
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getByText('The Avengers')).toBeInTheDocument();
  });
});
