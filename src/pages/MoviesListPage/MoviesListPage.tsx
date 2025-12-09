import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useMoviesListPage } from '../../hooks/useMoviesListPage';
import { MovieSearch } from '../../components/movies/MovieSearch';
import { MovieCard } from '../../components/movies/MovieCard';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { MoviesStatus } from '../../utils/enums';
import {
  ContentWrapper,
  Title,
  SearchSection,
  GridContainer,
} from './MoviesListPage.styled';

export const MoviesListPage: React.FC = () => {
  const { movies, status, error } = useMoviesListPage();
  const navigate = useNavigate();

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Container maxWidth="xl">
      <ContentWrapper>
        <Title>Popular Movies</Title>

        {/* Search Section */}
        <SearchSection>
          <MovieSearch />
        </SearchSection>

        {/* Loading State */}
        {status === MoviesStatus.Loading && <LoadingState />}

        {/* Error State */}
        {error && <ErrorState message="Failed to load movies" details={error} />}
        {/* Movies Grid */}
        {status === MoviesStatus.Succeeded && movies.length > 0 && (
          <GridContainer>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => handleCardClick(movie.id)} />
            ))}
          </GridContainer>
        )}
        {/* Empty State */}
        {status === MoviesStatus.Succeeded && movies.length === 0 && (
          <EmptyState message="No movies found. Try a different search." />
        )}
      </ContentWrapper>
    </Container>
  );
};
