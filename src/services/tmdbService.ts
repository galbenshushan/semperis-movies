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
 */
export const searchMovies = async (
  query: string,
  page: number = 1,
  year?: number,
  minRating?: number,
  genreId?: number,
  genres?: Array<{ id: number; name: string }>,
): Promise<Movie[]> => {
  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
      query,
      page: page.toString(),
    });

    if (year) {
      params.append('primary_release_year', year.toString());
    }

    if (genreId) {
      params.append('with_genres', genreId.toString());
    }

    const url = `${BASE_URL}/search/movie?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: TMDBMoviesResponse = await response.json();
    let movies = data.results.map((tmdbMovie) => mapTMDBMovieToMovie(tmdbMovie, genres));

    // Apply minimum rating filter if specified
    if (minRating !== undefined) {
      movies = movies.filter((movie) => movie.voteAverage >= minRating);
    }

    return movies;
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
