import React from 'react';
import { Container } from '@mui/material';
import { ContentWrapper, Title, Description } from './MoviesListPage.styled';

export const MoviesListPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <ContentWrapper>
        <Title>Movies List</Title>
        <Description>Movie list will be displayed here</Description>
        {/* TODO: Implement movie list display */}
      </ContentWrapper>
    </Container>
  );
};
