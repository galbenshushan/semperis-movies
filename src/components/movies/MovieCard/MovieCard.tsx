import React from 'react';
import type { Movie } from '../../../types/movie';
import {
  CardContainer,
  PosterWrapper,
  NoImagePlaceholder,
  CardContentWrapper,
  Title,
  Year,
  RatingBadge,
} from './MovieCard.styled';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const posterUrl = movie.posterPath ? `https://image.tmdb.org/t/p/w300${movie.posterPath}` : null;

  const releaseYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';
  const rating = Math.round(movie.voteAverage * 10) / 10;

  return (
    <CardContainer onClick={onClick}>
      <PosterWrapper>
        {posterUrl ? (
          <img src={posterUrl} alt={movie.title} loading="lazy" />
        ) : (
          <NoImagePlaceholder>No Image Available</NoImagePlaceholder>
        )}
      </PosterWrapper>
      <CardContentWrapper>
        <Title>{movie.title}</Title>
        <Year>{releaseYear}</Year>
        <RatingBadge>★ {rating}</RatingBadge>
      </CardContentWrapper>
    </CardContainer>
  );
};
