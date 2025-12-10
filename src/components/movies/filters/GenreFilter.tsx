import React, { memo } from 'react';
import { SelectFilter } from './SelectFilter';
import type { Genre } from '../../../store/moviesTypes';

interface GenreFilterProps {
  options: Genre[];
  value: number | null;
  onChange: (genreId: number | null) => void;
}

/**
 * GenreFilter: Genre selection filter using reusable SelectFilter component.
 */
export const GenreFilter: React.FC<GenreFilterProps> = memo(({ options, value, onChange }) => {
  return (
    <SelectFilter
      label="Genre"
      value={value}
      onChange={onChange}
      options={options.map((genre) => ({
        id: genre.id,
        label: genre.name,
      }))}
      placeholder="All Genres"
    />
  );
});

GenreFilter.displayName = 'GenreFilter';
