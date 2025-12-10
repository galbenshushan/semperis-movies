/**
 * TMDB Service - High-level API
 * Orchestrates client infrastructure and domain mapping
 */

import type { Movie, MovieDetails } from '../../types/movie';
import type { TMDBMovieDetails, TMDBMoviesResponse, TMDBCredits, TMDBMovie } from '../tmdbTypes';
import {
  tmdbFetch,
  buildDiscoverParams,
  fetchDiscoverPages,
  filterMoviesByQuery,
} from './tmdbClient';
import {
  mapTMDBMovieToMovie,
  mapTMDBCreditsToDirectorAndCast,
  mapTMDBMovieDetailsToMovieDetails,
} from './helpers/tmdbMappers';

/**
 * Fetch Marvel Studio movies from TMDB discover endpoint
 * Uses with_companies=420 to filter for Marvel Studios only
 */
export const fetchPopularMarvelMovies = async (
  page: number = 1,
  genres?: Array<{ id: number; name: string }>,
): Promise<Movie[]> => {
  try {
    const params = buildDiscoverParams({ page });
    const data = await tmdbFetch<TMDBMoviesResponse>('/discover/movie', params);
    return data.results.map((tmdbMovie) => mapTMDBMovieToMovie(tmdbMovie, genres));
  } catch (error) {
    console.error('Error fetching popular Marvel movies:', error);
    throw error;
  }
};

/**
 * Search movies by query string with optional filters
 * Always returns only Marvel Studios movies (company ID 420)
 *
 * Uses /discover/movie endpoint exclusively and applies server-side filters
 * when possible (year, genre, rating). For text queries or when multiple
 * filters are applied, fetches multiple pages and filters client-side to
 * ensure comprehensive results.
 *
 * @param query - Optional text search to filter by title (client-side)
 * @param page - Starting page number for pagination (default: 1)
 * @param year - Optional release year filter (server-side)
 * @param minRating - Optional minimum vote average filter (server-side)
 * @param genreId - Optional genre ID filter (server-side)
 * @param genres - Genre lookup array for mapping genre_ids to objects
 * @returns Promise<Movie[]> - Array of Marvel Studios movies matching all criteria
 */
export const searchMovies = async (
  query: string,
  page: number = 1,
  year?: number,
  minRating?: number,
  genreId?: number,
  genres?: Array<{ id: number; name: string }>,
): Promise<Movie[]> => {
  const MAX_PAGES_TO_FETCH = 5;
  const GOOD_ENOUGH_RESULTS = 60;

  try {
    const trimmedQuery = query.trim();
    const hasQuery = trimmedQuery.length > 0;
    const hasFilters = year !== undefined || minRating !== undefined || genreId !== undefined;

    // Build discover params with all filters
    const discoverParams = buildDiscoverParams({
      page,
      year,
      genreId,
      minRating,
    });

    // Determine if we need to fetch multiple pages
    const shouldFetchMultiplePages = hasQuery || hasFilters;

    let allMarvelMovies = [];

    if (shouldFetchMultiplePages) {
      // Fetch multiple pages with early exit condition
      const stopCondition = (movies: TMDBMovie[]): boolean => {
        // Stop if we have "enough" results and a text query exists
        return hasQuery && movies.length >= GOOD_ENOUGH_RESULTS;
      };

      allMarvelMovies = await fetchDiscoverPages(
        page,
        MAX_PAGES_TO_FETCH,
        discoverParams,
        stopCondition,
      );
    } else {
      // No query and no filters - fetch just the requested page
      const data = await tmdbFetch<TMDBMoviesResponse>('/discover/movie', discoverParams);
      allMarvelMovies = data.results;
    }

    // If query is provided, filter accumulated movies on the client side by title
    if (hasQuery) {
      const filteredMovies = filterMoviesByQuery(allMarvelMovies, trimmedQuery);
      return filteredMovies.map((tmdbMovie) => mapTMDBMovieToMovie(tmdbMovie, genres));
    }

    // No query - return all accumulated movies (server-side filters already applied)
    return allMarvelMovies.map((tmdbMovie) => mapTMDBMovieToMovie(tmdbMovie, genres));
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Fetch all movie genres from TMDB
 */
export const fetchGenres = async (): Promise<Array<{ id: number; name: string }>> => {
  try {
    const data = await tmdbFetch<{ genres: Array<{ id: number; name: string }> }>(
      '/genre/movie/list',
    );
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

/**
 * Fetch detailed information about a specific movie with credits
 */
export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  try {
    const [movieData, creditsData] = await Promise.all([
      tmdbFetch<TMDBMovieDetails>(`/movie/${movieId}`),
      tmdbFetch<TMDBCredits>(`/movie/${movieId}/credits`),
    ]);

    const { director, cast } = mapTMDBCreditsToDirectorAndCast(creditsData);

    return mapTMDBMovieDetailsToMovieDetails(movieData, director, cast);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Fetch detailed information about a specific person (actor/cast member)
 */
export const fetchPersonDetails = async (personId: number) => {
  try {
    const data = await tmdbFetch<{
      id: number;
      name: string;
      profile_path: string | null;
      birthday?: string | null;
      deathday?: string | null;
      place_of_birth?: string | null;
      biography?: string | null;
      popularity?: number;
    }>(`/person/${personId}`);

    return {
      id: data.id,
      name: data.name,
      profilePath: data.profile_path,
      birthday: data.birthday,
      deathday: data.deathday,
      placeOfBirth: data.place_of_birth,
      biography: data.biography,
      popularity: data.popularity,
    };
  } catch (error) {
    console.error('Error fetching person details:', error);
    throw error;
  }
};
