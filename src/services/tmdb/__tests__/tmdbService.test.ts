import { describe, test, beforeEach, expect, vi } from 'vitest';
import {
  fetchPopularMarvelMovies,
  searchMovies,
  fetchGenres,
  fetchMovieDetails,
  fetchPersonDetails,
} from '../tmdbService';
import * as tmdbClient from '../tmdbClient';

// Mock tmdbClient
vi.mock('../tmdbClient', () => ({
  tmdbFetch: vi.fn(),
  buildDiscoverParams: vi.fn((params) => params),
  fetchDiscoverPages: vi.fn(),
  filterMoviesByQuery: vi.fn((movies, query) =>
    movies.filter((m: any) => m.title.toLowerCase().includes(query.toLowerCase()))
  ),
}));

// Mock mappers
vi.mock('../helpers/tmdbMappers', () => ({
  mapTMDBMovieToMovie: vi.fn((tmdbMovie) => ({
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    releaseDate: tmdbMovie.release_date,
    posterPath: tmdbMovie.poster_path,
    voteAverage: tmdbMovie.vote_average,
  })),
  mapTMDBCreditsToDirectorAndCast: vi.fn(() => ({
    director: 'Test Director',
    cast: [],
  })),
  mapTMDBMovieDetailsToMovieDetails: vi.fn((movieData, director, cast) => ({
    id: movieData.id,
    title: movieData.title,
    releaseDate: movieData.release_date,
    posterPath: movieData.poster_path,
    voteAverage: movieData.vote_average,
    overview: movieData.overview,
    genres: [],
    runtime: movieData.runtime,
    director,
    cast,
  })),
}));

const mockTmdbFetch = tmdbClient.tmdbFetch as ReturnType<typeof vi.fn>;

describe('tmdbService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchPopularMarvelMovies', () => {
    test('fetches and maps popular Marvel movies', async () => {
      const mockResponse = {
        results: [
          {
            id: 1,
            title: 'Iron Man',
            release_date: '2008-05-02',
            poster_path: '/path1.jpg',
            vote_average: 7.9,
          },
          {
            id: 2,
            title: 'The Avengers',
            release_date: '2012-05-04',
            poster_path: '/path2.jpg',
            vote_average: 8.0,
          },
        ],
      };

      mockTmdbFetch.mockResolvedValue(mockResponse);

      const result = await fetchPopularMarvelMovies(1);

      expect(mockTmdbFetch).toHaveBeenCalledWith('/discover/movie', { page: 1 });
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Iron Man');
      expect(result[1].title).toBe('The Avengers');
    });

    test('throws error when fetch fails', async () => {
      mockTmdbFetch.mockRejectedValue(new Error('API Error'));

      await expect(fetchPopularMarvelMovies(1)).rejects.toThrow('API Error');
    });
  });

  describe('searchMovies', () => {
    test('searches movies with query', async () => {
      const mockMovies = [
        {
          id: 1,
          title: 'Iron Man',
          release_date: '2008-05-02',
          poster_path: '/path1.jpg',
          vote_average: 7.9,
        },
      ];

      (tmdbClient.fetchDiscoverPages as ReturnType<typeof vi.fn>).mockResolvedValue(mockMovies);

      const result = await searchMovies('Iron Man', 1);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Iron Man');
    });

    test('searches movies with filters (year, rating, genre)', async () => {
      const mockMovies = [
        {
          id: 1,
          title: 'Iron Man',
          release_date: '2008-05-02',
          poster_path: '/path1.jpg',
          vote_average: 7.9,
        },
      ];

      (tmdbClient.fetchDiscoverPages as ReturnType<typeof vi.fn>).mockResolvedValue(mockMovies);

      const result = await searchMovies('Iron', 1, 2008, 7.0, 28);

      expect(result).toHaveLength(1);
      expect((tmdbClient.fetchDiscoverPages as ReturnType<typeof vi.fn>)).toHaveBeenCalled();
    });

    test('throws error when search fails', async () => {
      (tmdbClient.fetchDiscoverPages as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Search failed'));

      await expect(searchMovies('test')).rejects.toThrow('Search failed');
    });
  });

  describe('fetchGenres', () => {
    test('fetches and returns genres', async () => {
      const mockResponse = {
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
        ],
      };

      mockTmdbFetch.mockResolvedValue(mockResponse);

      const result = await fetchGenres();

      expect(mockTmdbFetch).toHaveBeenCalledWith('/genre/movie/list');
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 28, name: 'Action' });
    });

    test('throws error when fetching genres fails', async () => {
      mockTmdbFetch.mockRejectedValue(new Error('Genre fetch failed'));

      await expect(fetchGenres()).rejects.toThrow('Genre fetch failed');
    });
  });

  describe('fetchMovieDetails', () => {
    test('fetches movie details with credits', async () => {
      const mockMovieResponse = {
        id: 1,
        title: 'Iron Man',
        release_date: '2008-05-02',
        poster_path: '/path1.jpg',
        vote_average: 7.9,
        overview: 'A genius billionaire...',
        runtime: 126,
      };

      const mockCreditsResponse = {
        cast: [],
        crew: [],
      };

      mockTmdbFetch
        .mockResolvedValueOnce(mockMovieResponse)
        .mockResolvedValueOnce(mockCreditsResponse);

      const result = await fetchMovieDetails(1);

      expect(mockTmdbFetch).toHaveBeenCalledWith('/movie/1');
      expect(mockTmdbFetch).toHaveBeenCalledWith('/movie/1/credits');
      expect(result).toBeTruthy();
      expect(result?.title).toBe('Iron Man');
    });

    test('throws error when fetching movie details fails', async () => {
      mockTmdbFetch.mockRejectedValue(new Error('Details fetch failed'));

      await expect(fetchMovieDetails(1)).rejects.toThrow('Details fetch failed');
    });
  });

  describe('fetchPersonDetails', () => {
    test('fetches and maps person details', async () => {
      const mockResponse = {
        id: 3223,
        name: 'Robert Downey Jr.',
        profile_path: '/path.jpg',
        birthday: '1965-04-04',
        place_of_birth: 'Manhattan, New York',
        biography: 'Robert John Downey Jr. is an American actor...',
      };

      mockTmdbFetch.mockResolvedValue(mockResponse);

      const result = await fetchPersonDetails(3223);

      expect(mockTmdbFetch).toHaveBeenCalledWith('/person/3223');
      expect(result.name).toBe('Robert Downey Jr.');
      expect(result.placeOfBirth).toBe('Manhattan, New York');
    });

    test('throws error when fetching person details fails', async () => {
      mockTmdbFetch.mockRejectedValue(new Error('Person fetch failed'));

      await expect(fetchPersonDetails(1)).rejects.toThrow('Person fetch failed');
    });
  });
});
