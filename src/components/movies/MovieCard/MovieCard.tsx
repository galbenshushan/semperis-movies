import React from 'react';
import {
  StyledCard,
  ImageContainer,
  Image,
  NoImagePlaceholder,
  ContentContainer,
  Title,
  RatingText,
} from './MovieCard.styled';

interface MovieCardProps {
  movieId: number;
  title: string;
  posterPath?: string;
  rating?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath, rating }) => {
  return (
    <StyledCard>
      <ImageContainer>
        {posterPath ? (
          <Image src={posterPath} alt={title} />
        ) : (
          <NoImagePlaceholder>No Image</NoImagePlaceholder>
        )}
      </ImageContainer>
      <ContentContainer>
        <Title>{title}</Title>
        {rating && <RatingText>Rating: {rating}/10</RatingText>}
      </ContentContainer>
    </StyledCard>
  );
};
