import type { Movie, MovieDetails } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
}

interface TMDBMovieDetails extends TMDBMovie {
  overview: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  director?: string;
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
 */
const mapTMDBMovieToMovie = (tmdbMovie: TMDBMovie): Movie => ({
  id: tmdbMovie.id,
  title: tmdbMovie.title,
  releaseDate: tmdbMovie.release_date,
  voteAverage: tmdbMovie.vote_average,
  posterPath: tmdbMovie.poster_path,
});

/**
 * Map TMDB movie details response to our MovieDetails interface
 */
const mapTMDBMovieDetailsToMovieDetails = (tmdbMovie: TMDBMovieDetails): MovieDetails => ({
  id: tmdbMovie.id,
  title: tmdbMovie.title,
  releaseDate: tmdbMovie.release_date,
  voteAverage: tmdbMovie.vote_average,
  posterPath: tmdbMovie.poster_path,
  overview: tmdbMovie.overview,
  genres: tmdbMovie.genres,
  runtime: tmdbMovie.runtime,
  director: tmdbMovie.director,
  revenue: tmdbMovie.revenue,
  budget: tmdbMovie.budget,
});

/**
 * Fetch popular movies from TMDB
 */
export const fetchPopularMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: TMDBMoviesResponse = await response.json();
    return data.results.map(mapTMDBMovieToMovie);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
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
    let movies = data.results.map(mapTMDBMovieToMovie);

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
 * Fetch detailed information about a specific movie
 */
export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  try {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: TMDBMovieDetails = await response.json();
    return mapTMDBMovieDetailsToMovieDetails(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
