export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profilePath?: string | null;
}

export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string | null;
  genres?: Array<{ id: number; name: string }>;
}

export interface MovieDetails extends Movie {
  overview: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  backdropPath?: string | null;
  director?: string | null;
  cast?: CastMember[];
  revenue?: number;
  budget?: number;
}

export interface MoviesFilters {
  query?: string;
  year?: number;
  minRating?: number;
  genreId?: number;
}
