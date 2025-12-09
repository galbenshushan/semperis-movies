import { useMemo } from 'react';

interface UseMovieDetailsHeroMemoParams {
  genres: Array<{ id: number; name: string }>;
  voteAverage: number;
  runtime: number;
  releaseYear: number | null;
  overview: string;
}

interface UseMovieDetailsHeroMemoReturn {
  ratingString: string;
  runtimeString: string;
  releaseYearString: string;
  memoizedOverview: string;
}

/**
 * Custom hook that memoizes computed values for MovieDetailsHero component.
 * Encapsulates all derived data calculations to keep the component clean and focused.
 */
export const useMovieDetailsHeroMemo = (
  params: UseMovieDetailsHeroMemoParams,
): UseMovieDetailsHeroMemoReturn => {
  const { voteAverage, runtime, releaseYear, overview } = params;

  // Memoize rating string
  const ratingString = useMemo(() => `★ ${voteAverage.toFixed(1)}/10`, [voteAverage]);

  // Memoize runtime string
  const runtimeString = useMemo(() => `${runtime} min`, [runtime]);

  // Memoize release year string
  const releaseYearString = useMemo(() => `(${releaseYear})`, [releaseYear]);

  // Memoize overview text
  const memoizedOverview = useMemo(() => overview, [overview]);

  return {
    ratingString,
    runtimeString,
    releaseYearString,
    memoizedOverview,
  };
};
