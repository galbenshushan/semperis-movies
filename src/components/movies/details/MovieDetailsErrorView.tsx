import React from 'react';
import { ErrorState } from '../../ui/ErrorState/ErrorState';
import {
  ErrorContainer,
  BackButton,
} from '../../../pages/MovieDetailsPage/MovieDetailsPage.styled';

export interface MovieDetailsErrorViewProps {
  error: string;
  onGoHome: () => void;
}

/**
 * Presentational component that displays an error state when movie details fail to load.
 */
export const MovieDetailsErrorView: React.FC<MovieDetailsErrorViewProps> = ({
  error,
  onGoHome,
}) => {
  return (
    <ErrorContainer>
      <ErrorState message="Failed to load movie details" details={error} variant="error" />
      <BackButton onClick={onGoHome}>Back to Home</BackButton>
    </ErrorContainer>
  );
};
