/**
 * Status enum for movies data fetching operations
 */
export enum MoviesStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

/**
 * Sort direction enum for sorting operations
 */
export enum SortDirection {
  Asc = 'Asc',
  Desc = 'Desc',
}
