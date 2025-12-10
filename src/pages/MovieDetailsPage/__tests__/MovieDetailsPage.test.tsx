import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, beforeEach, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from '../../../store/moviesSlice';
import { useSelectedMovie } from '../../../hooks/useSelectedMovie';

const createMockStore = () => {
  return configureStore({
    reducer: {
      movies: moviesReducer,
    },
  });
};

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createMockStore();
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

describe('MovieDetailsPage - useSelectedMovie hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('provides selectedMovie state from Redux store', () => {
    const { result } = renderHook(() => useSelectedMovie(), { wrapper });

    expect(result.current.selectedMovie).toBeNull();
    expect(typeof result.current.isLoading).toBe('boolean');
    expect(typeof result.current.isError).toBe('boolean');
    expect(typeof result.current.isNotFound).toBe('boolean');
  });

  test('has handleBack function', () => {
    const { result } = renderHook(() => useSelectedMovie(), { wrapper });

    expect(result.current.handleBack).toBeDefined();
    expect(typeof result.current.handleBack).toBe('function');
  });

  test('has handleGoHome function', () => {
    const { result } = renderHook(() => useSelectedMovie(), { wrapper });

    expect(result.current.handleGoHome).toBeDefined();
    expect(typeof result.current.handleGoHome).toBe('function');
  });

  test('has handleOpenTMDB function', () => {
    const { result } = renderHook(() => useSelectedMovie(), { wrapper });

    expect(result.current.handleOpenTMDB).toBeDefined();
    expect(typeof result.current.handleOpenTMDB).toBe('function');
  });

  test('returns all required properties for movie details page', () => {
    const { result } = renderHook(() => useSelectedMovie(), { wrapper });

    expect(result.current).toHaveProperty('selectedMovie');
    expect(result.current).toHaveProperty('status');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('posterUrl');
    expect(result.current).toHaveProperty('backdropUrl');
    expect(result.current).toHaveProperty('releaseYear');
    expect(result.current).toHaveProperty('formattedReleaseDate');
    expect(result.current).toHaveProperty('director');
    expect(result.current).toHaveProperty('cast');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('isError');
    expect(result.current).toHaveProperty('isNotFound');
    expect(result.current).toHaveProperty('handleBack');
    expect(result.current).toHaveProperty('handleGoHome');
    expect(result.current).toHaveProperty('handleOpenTMDB');
  });
});

