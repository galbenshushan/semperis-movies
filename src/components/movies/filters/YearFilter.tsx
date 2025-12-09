import React, { memo, useMemo } from 'react';
import { SelectFilter } from './SelectFilter';

interface YearFilterProps {
  value: number | null;
  onChange: (year: number | null) => void;
}

/**
 * YearFilter: Year selection filter using reusable SelectFilter component.
 * Generates years from 1970 to current year.
 */
export const YearFilter: React.FC<YearFilterProps> = memo(({ value, onChange }) => {
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let year = currentYear; year >= 1970; year--) {
      years.push(year);
    }
    return years.map((year) => ({
      id: year,
      label: year.toString(),
    }));
  }, []);

  return (
    <SelectFilter
      label="Year"
      value={value}
      onChange={onChange}
      options={yearOptions}
      placeholder="All Years"
    />
  );
});

YearFilter.displayName = 'YearFilter';
