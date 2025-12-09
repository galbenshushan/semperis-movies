export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string | null;
}

export interface MovieDetails extends Movie {
  overview: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  director?: string;
  revenue?: number;
  budget?: number;
}

export interface MoviesFilters {
  query?: string;
  year?: number;
  minRating?: number;
  genreId?: number;
}
