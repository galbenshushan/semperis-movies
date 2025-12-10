import type { Movie, MovieDetails } from '../types/movie';
import { MoviesStatus } from '../utils/enums';

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  genres: Genre[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  status: MoviesStatus;
  error: string | null;
  searchQuery: string;
  selectedGenreId: number | null;
  selectedYear: number | null;
  selectedRating: number | null;
}
