import React, { useMemo } from 'react';
import { GenreChip } from '../../../pages/MovieDetailsPage/MovieDetailsPage.styled';

interface GenreChipListProps {
  genres: Array<{ id: number; name: string }>;
}

/**
 * GenreChipList: Memoized component that renders genre chips.
 */
const GenreChipListComponent: React.FC<GenreChipListProps> = ({ genres }) => {
  // Memoize genres mapping to prevent re-creating JSX elements on every render
  const renderedGenres = useMemo(
    () => genres.map((genre) => <GenreChip key={genre.id} label={genre.name} size="small" />),
    [genres],
  );

  return <>{renderedGenres}</>;
};

/**
 * Wrap with React.memo to prevent re-renders unless genres prop changes.
 */
export const GenreChipList = React.memo(GenreChipListComponent);
