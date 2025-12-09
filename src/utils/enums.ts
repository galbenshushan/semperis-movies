/**
 * Status enum for movies data fetching operations
 */
export const MoviesStatus = {
  Idle: 'Idle',
  Loading: 'Loading',
  Succeeded: 'Succeeded',
  Failed: 'Failed',
} as const;

export type MoviesStatus = (typeof MoviesStatus)[keyof typeof MoviesStatus];

