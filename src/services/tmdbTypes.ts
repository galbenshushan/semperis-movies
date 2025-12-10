/**
 * TMDB API Response and Request Types
 * These interfaces represent the structure of data returned by TMDB API
 */

export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  genre_ids?: number[];
  production_companies?: Array<{ id: number; name: string }>;
  genres?: Array<{ id: number; name: string }>;
}

export interface TMDBCreditsCast {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
}

export interface TMDBCrew {
  id: number;
  name: string;
  job: string;
  profile_path?: string | null;
}

export interface TMDBCredits {
  cast: TMDBCreditsCast[];
  crew: TMDBCrew[];
}

export interface TMDBMovieDetails extends TMDBMovie {
  overview: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  backdrop_path?: string | null;
  director?: string | null;
  cast?: Array<{ id: number; name: string; character?: string; profile_path?: string | null }>;
  revenue?: number;
  budget?: number;
}

export interface TMDBMoviesResponse {
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  birthday?: string | null;
  deathday?: string | null;
  place_of_birth?: string | null;
  biography?: string | null;
  popularity?: number;
}
