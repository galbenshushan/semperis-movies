import React from 'react';
import { EmptyContainer, EmptyText } from './EmptyState.styled';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No movies found. Try a different search.',
}) => {
  return (
    <EmptyContainer>
      <EmptyText>{message}</EmptyText>
    </EmptyContainer>
  );
};
