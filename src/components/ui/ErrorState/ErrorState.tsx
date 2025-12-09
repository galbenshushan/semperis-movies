import React from 'react';
import { ErrorContainer, ErrorIcon, ErrorText } from './ErrorState.styled';

interface ErrorStateProps {
  message?: string;
  details?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load',
  details = '',
}) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText>{message}</ErrorText>
      {details && <p>{details}</p>}
    </ErrorContainer>
  );
};
