/**
 * TMDB Mappers - Domain mapping logic
 * Transforms raw TMDB API responses to domain-specific types
 */

import type { Movie, MovieDetails } from '../../../types/movie';
import type { TMDBMovie, TMDBCredits, TMDBMovieDetails } from '../../tmdbTypes';

/**
 * Map TMDB movie response to our Movie interface
 * Converts genre_ids to genre objects using the genres lookup
 */
export const mapTMDBMovieToMovie = (
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
export const mapTMDBCreditsToDirectorAndCast = (
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
export const mapTMDBMovieDetailsToMovieDetails = (
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
