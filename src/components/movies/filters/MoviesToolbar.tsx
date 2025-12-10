import React, { memo } from 'react';
import { SearchInput } from './SearchInput';
import { YearFilter } from './YearFilter';
import { RatingFilter } from './RatingFilter';
import type { Genre } from '../../../store/moviesTypes';
import { GenreFilter } from './GenreFilter';
import { ToolbarContainer, FiltersWrapper } from './MoviesToolbar.styled';

interface MoviesToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  clearSearch: () => void;
  genreOptions: Genre[];
  selectedGenreId: number | null;
  onGenreChange: (genreId: number | null) => void;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
}

/**
 * MoviesToolbar: Composes all filter components.
 * Pure presentation - all state and handlers passed via props.
 */
export const MoviesToolbar: React.FC<MoviesToolbarProps> = memo(
  ({
    searchQuery,
    onSearchChange,
    clearSearch,
    genreOptions,
    selectedGenreId,
    onGenreChange,
    selectedYear,
    onYearChange,
    selectedRating,
    onRatingChange,
  }) => {
    return (
      <ToolbarContainer>
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          onClear={clearSearch}
          placeholder="Search movies..."
        />
        <FiltersWrapper>
          <GenreFilter options={genreOptions} value={selectedGenreId} onChange={onGenreChange} />
          <YearFilter value={selectedYear} onChange={onYearChange} />
          <RatingFilter value={selectedRating} onChange={onRatingChange} />
        </FiltersWrapper>
      </ToolbarContainer>
    );
  },
);

MoviesToolbar.displayName = 'MoviesToolbar';
