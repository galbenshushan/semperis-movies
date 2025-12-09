import React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ContentWrapper, Title, Description } from './MovieDetailsPage.styled';

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container maxWidth="lg">
      <ContentWrapper>
        <Title>Movie Details</Title>
        <Description>Movie details for ID: {id} will be displayed here</Description>
        {/* TODO: Implement movie details display */}
      </ContentWrapper>
    </Container>
  );
};
