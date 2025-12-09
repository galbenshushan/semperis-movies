import React from 'react';
import { ErrorContainer, ErrorIcon, ErrorText } from './ErrorState.styled';

interface ErrorStateProps {
  message?: string;
  details?: string;
  variant?: 'error' | 'notfound';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load',
  details = '',
  variant = 'error',
}) => {
  const icon = variant === 'notfound' ? '🎬' : '⚠️';

  return (
    <ErrorContainer>
      <ErrorIcon>{icon}</ErrorIcon>
      <ErrorText>{message}</ErrorText>
      {details && <p>{details}</p>}
    </ErrorContainer>
  );
};
