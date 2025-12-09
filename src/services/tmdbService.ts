import type { Movie, MovieDetails } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  genre_ids?: number[];
  production_companies?: Array<{ id: number; name: string }>;
  genres?: Array<{ id: number; name: string }>;
}

interface TMDBCreditsCast {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
}

interface TMDBCrew {
  id: number;
  name: string;
  job: string;
  profile_path?: string | null;
}

interface TMDBCredits {
  cast: TMDBCreditsCast[];
  crew: TMDBCrew[];
}

interface TMDBMovieDetails extends TMDBMovie {
  overview: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  backdrop_path?: string | null;
  director?: string | null;
  cast?: Array<{ id: number; name: string; character?: string; profile_path?: string | null }>;
  revenue?: number;
  budget?: number;
}

interface TMDBMoviesResponse {
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
  page: number;
}

/**
 * Map TMDB movie response to our Movie interface
 * Converts genre_ids to genre objects using the genres lookup
 */
const mapTMDBMovieToMovie = (
  tmdbMovie: TMDBMovie,
  genresLookup?: Array<{ id: number; name: string }>,
): Movie => {
  // Map genre_ids to genre objects
  let genres: Array<{ id: number; name: string }> | undefined;
  if (tmdbMovie.genre_ids && genresLookup) {
    genres = tmdbMovie.genre_ids
      .map((genreId) => genresLookup.find((g) => g.id === genreId))
      .filter((g): g is { id: number; name: string } => g !== undefined);
  }

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    releaseDate: tmdbMovie.release_date,
    voteAverage: tmdbMovie.vote_average,
    posterPath: tmdbMovie.poster_path,
    ...(genres && { genres }),
  };
};

/**
 * Map TMDB credits response to extract director and cast
 */
const mapTMDBCreditsToDirectorAndCast = (
  credits: TMDBCredits,
): { director: string | null; cast: Array<{ id: number; name: string; character?: string }> } => {
  const director = credits.crew.find((person) => person.job === 'Director')?.name || null;

  const cast = credits.cast.slice(0, 5).map((member) => ({
    id: member.id,
    name: member.name,
    character: member.character,
  }));

  return { director, cast };
};

/**
 * Map TMDB movie details response to our MovieDetails interface
 */
const mapTMDBMovieDetailsToMovieDetails = (
  tmdbMovie: TMDBMovieDetails,
  director: string | null = null,
  cast: Array<{ id: number; name: string; character?: string }> = [],
): MovieDetails => ({
  id: tmdbMovie.id,
  title: tmdbMovie.title,
  releaseDate: tmdbMovie.release_date,
  voteAverage: tmdbMovie.vote_average,
  posterPath: tmdbMovie.poster_path,
  backdropPath: tmdbMovie.backdrop_path,
  overview: tmdbMovie.overview,
  genres: tmdbMovie.genres,
  runtime: tmdbMovie.runtime,
  director,
  cast,
  revenue: tmdbMovie.revenue,
  budget: tmdbMovie.budget,
});

/**
 * Fetch Marvel Studio movies from TMDB discover endpoint
 * Uses with_companies=420 to filter for Marvel Studios only
 */
export const fetchPopularMarvelMovies = async (
  page: number = 1,
  genres?: Array<{ id: number; name: string }>,
): Promise<Movie[]> => {
  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
      with_companies: '420', // Marvel Studios ID
      sort_by: 'popularity.desc',
      page: page.toString(),
    });

    const url = `${BASE_URL}/discover/movie?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: TMDBMoviesResponse = await response.json();
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

    // Accumulator for all discovered Marvel movies
    const allMarvelMovies: TMDBMovie[] = [];

    // Build params for discover endpoint - always include Marvel Studios filter
    const buildParams = (pageNum: number): URLSearchParams => {
      const params = new URLSearchParams({
        api_key: API_KEY,
        with_companies: '420', // Marvel Studios ID
        sort_by: 'popularity.desc',
        page: pageNum.toString(),
      });

      // Apply server-side filters
      if (year) {
        params.append('primary_release_year', year.toString());
      }

      if (genreId) {
        params.append('with_genres', genreId.toString());
      }

      if (minRating !== undefined) {
        params.append('vote_average.gte', String(minRating));
      }

      return params;
    };

    // Fetch multiple pages if:
    // 1. User provided a text query, OR
    // 2. User applied any filters (year/genre/rating)
    // This ensures we get comprehensive results instead of stopping at page 1
    const shouldFetchMultiplePages = hasQuery || hasFilters;

    if (shouldFetchMultiplePages) {
      let currentPage = page;
      let hasMorePages = true;

      while (hasMorePages && currentPage - page < MAX_PAGES_TO_FETCH) {
        const params = buildParams(currentPage);
        const url = `${BASE_URL}/discover/movie?${params.toString()}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`TMDB API error: ${response.status}`);
        }

        const data: TMDBMoviesResponse = await response.json();

        // If no results on this page, stop fetching
        if (!data.results.length) {
          hasMorePages = false;
          break;
        }

        // Add results to accumulator
        allMarvelMovies.push(...data.results);

        // Early exit if we have "enough" results and a text query exists
        if (hasQuery && allMarvelMovies.length >= GOOD_ENOUGH_RESULTS) {
          hasMorePages = false;
          break;
        }

        // Check if there are more pages to fetch
        if (currentPage >= data.total_pages) {
          hasMorePages = false;
          break;
        }

        currentPage++;
      }
    } else {
      // No query and no filters - fetch just the requested page
      const params = buildParams(page);
      const url = `${BASE_URL}/discover/movie?${params.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data: TMDBMoviesResponse = await response.json();
      allMarvelMovies.push(...data.results);
    }

    // If query is provided, filter accumulated movies on the client side by title
    if (hasQuery) {
      const queryLower = trimmedQuery.toLowerCase();
      const filteredMovies = allMarvelMovies.filter((tmdbMovie) => {
        // Match against title
        return tmdbMovie.title.toLowerCase().includes(queryLower);
      });

      // Map filtered results to Movie type
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
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: { genres: Array<{ id: number; name: string }> } = await response.json();
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
    const [movieResponse, creditsResponse] = await Promise.all([
      fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`),
    ]);

    if (!movieResponse.ok || !creditsResponse.ok) {
      throw new Error(`TMDB API error: ${movieResponse.status}`);
    }

    const movieData: TMDBMovieDetails = await movieResponse.json();
    const creditsData: TMDBCredits = await creditsResponse.json();

    const { director, cast } = mapTMDBCreditsToDirectorAndCast(creditsData);

    return mapTMDBMovieDetailsToMovieDetails(movieData, director, cast);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
