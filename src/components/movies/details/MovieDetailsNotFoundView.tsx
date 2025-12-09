import React from 'react';
import { ErrorState } from '../../ui/ErrorState/ErrorState';
import {
  ErrorContainer,
  BackButton,
} from '../../../pages/MovieDetailsPage/MovieDetailsPage.styled';

export interface MovieDetailsNotFoundViewProps {
  onGoHome: () => void;
}

/**
 * Presentational component that displays a "not found" message when no movie is loaded.
 */
export const MovieDetailsNotFoundView: React.FC<MovieDetailsNotFoundViewProps> = ({ onGoHome }) => {
  return (
    <ErrorContainer>
      <ErrorState message="Movie Not Found" variant="notfound" />
      <BackButton onClick={onGoHome}>Back to Home</BackButton>
    </ErrorContainer>
  );
};
