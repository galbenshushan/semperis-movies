import React, { memo } from 'react';
import { SelectFilter } from './SelectFilter';

interface RatingFilterProps {
  value: number | null;
  onChange: (rating: number | null) => void;
}

/**
 * RatingFilter: Minimum rating selection filter using reusable SelectFilter component.
 */
export const RatingFilter: React.FC<RatingFilterProps> = memo(({ value, onChange }) => {
  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => ({
    id: rating,
    label: `${rating}+`,
  }));

  return (
    <SelectFilter
      label="Min Rating"
      value={value}
      onChange={onChange}
      options={ratingOptions}
      placeholder="All Ratings"
      formatLabel={(option) => `⭐ ${option.label}`}
    />
  );
});

RatingFilter.displayName = 'RatingFilter';
