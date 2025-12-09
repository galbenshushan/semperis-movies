import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useMovies } from '../../hooks/useMovies';
import { MoviesToolbar } from '../../components/movies/filters/MoviesToolbar';
import { MovieCard } from '../../components/movies/MovieCard';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { MoviesStatus } from '../../utils/enums';
import type { Movie } from '../../types/movie';
import { ContentWrapper, SearchSection, GridContainer } from './MoviesListPage.styled';

export const MoviesListPage: React.FC = () => {
  const {
    filteredMovies,
    status,
    error,
    genres,
    searchQuery,
    setSearchQuery,
    clearSearch,
    selectedGenreId,
    setSelectedGenreId,
    selectedYear,
    setSelectedYear,
    selectedRating,
    setSelectedRating,
  } = useMovies();
  const navigate = useNavigate();

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Container maxWidth="xl">
      <ContentWrapper>
        {/* Search and Filter Toolbar */}
        <SearchSection>
          <MoviesToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            clearSearch={clearSearch}
            genreOptions={genres}
            selectedGenreId={selectedGenreId}
            onGenreChange={setSelectedGenreId}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
          />
        </SearchSection>

        {/* Error State */}
        {error && <ErrorState message="Failed to load movies" details={error} />}

        {/* Movies Grid */}
        {filteredMovies.length > 0 && (
          <GridContainer>
            {filteredMovies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => handleCardClick(movie.id)} />
            ))}
          </GridContainer>
        )}

        {/* Loading State - shown on initial load */}
        {status === MoviesStatus.Loading && filteredMovies.length === 0 && <LoadingState />}

        {/* Empty State */}
        {status === MoviesStatus.Succeeded && filteredMovies.length === 0 && (
          <EmptyState message="No movies found. Try adjusting your filters." />
        )}
      </ContentWrapper>
    </Container>
  );
};
