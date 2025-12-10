/**
 * TMDB Client - Low-level HTTP and infrastructure logic
 * Handles API communication, parameter building, and data fetching
 */

import type { TMDBMovie, TMDBMoviesResponse } from '../tmdbTypes';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';

/**
 * Ensures TMDB API key is available before making requests
 */
function ensureTmdbApiKey(): void {
  if (!API_KEY || API_KEY.trim() === '') {
    throw new Error('TMDB_CONFIG_ERROR');
  }
}

/**
 * Generic TMDB HTTP helper for all API requests
 * Handles URL building, API key attachment, error handling, and response parsing
 *
 * @template T - The expected response type
 * @param path - API endpoint path (e.g., "/movie/550")
 * @param params - Optional query parameters to append
 * @returns Promise resolving to the parsed JSON response
 * @throws Error with clear message if API call fails
 */
export async function tmdbFetch<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<T> {
  ensureTmdbApiKey();

  const url = new URL(`${BASE_URL}${path}`);

  // Always include API key
  url.searchParams.append('api_key', API_KEY);

  // Append additional parameters if provided
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from TMDB: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Build query parameters for the discover/movie endpoint
 * Always includes Marvel Studios filter (company 420)
 */
export function buildDiscoverParams(options: {
  sortBy?: string;
  page?: number;
  year?: number;
  genreId?: number;
  minRating?: number;
}): Record<string, string | number> {
  const params: Record<string, string | number> = {
    with_companies: '420', // Marvel Studios ID
    sort_by: options.sortBy || 'popularity.desc',
    page: options.page || 1,
  };

  if (options.year) {
    params.primary_release_year = options.year;
  }

  if (options.genreId) {
    params.with_genres = options.genreId;
  }

  if (options.minRating !== undefined) {
    params['vote_average.gte'] = options.minRating;
  }

  return params;
}

/**
 * Fetch multiple pages of discover results
 * Returns accumulated movies across all fetched pages
 */
export async function fetchDiscoverPages(
  startPage: number,
  maxPages: number,
  params: Record<string, string | number>,
  stopCondition?: (movies: TMDBMovie[], pageCount: number) => boolean,
): Promise<TMDBMovie[]> {
  const allMovies: TMDBMovie[] = [];
  let currentPage = startPage;
  let pagesFetched = 0;
  let hasMorePages = true;

  while (hasMorePages && pagesFetched < maxPages) {
    const pageParams = { ...params, page: currentPage };
    const data = await tmdbFetch<TMDBMoviesResponse>('/discover/movie', pageParams);

    if (!data.results.length) {
      hasMorePages = false;
      break;
    }

    allMovies.push(...data.results);
    pagesFetched++;

    // Check stop condition if provided
    if (stopCondition?.(allMovies, pagesFetched)) {
      break;
    }

    // Check if there are more pages available
    if (currentPage >= data.total_pages) {
      hasMorePages = false;
      break;
    }

    currentPage++;
  }

  return allMovies;
}

/**
 * Filter movies by title query (client-side filtering)
 */
export function filterMoviesByQuery(movies: TMDBMovie[], query: string): TMDBMovie[] {
  const queryLower = query.trim().toLowerCase();
  return movies.filter((movie) => movie.title.toLowerCase().includes(queryLower));
}
