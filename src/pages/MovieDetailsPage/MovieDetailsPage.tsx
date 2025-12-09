import React from 'react';
import { useSelectedMovie } from '../../hooks/useSelectedMovie';
import { LoadingState } from '../../components/ui/LoadingState';
import { MovieDetailsHero } from '../../components/movies/details/MovieDetailsHero';
import { MovieDetailsErrorView } from '../../components/movies/details/MovieDetailsErrorView';
import { MovieDetailsNotFoundView } from '../../components/movies/details/MovieDetailsNotFoundView';
import { PageWrapper } from './MovieDetailsPage.styled';

/**
 * MovieDetailsPage: Lean, presentational page component.
 * All business logic is delegated to useSelectedMovie hook.
 * UI is split into focused presentational components.
 */
export const MovieDetailsPage: React.FC = () => {
  const {
    selectedMovie,
    posterUrl,
    backdropUrl,
    releaseYear,
    formattedReleaseDate,
    handleBack,
    handleGoHome,
    handleOpenTMDB,
    isLoading,
    isError,
    isNotFound,
    error,
  } = useSelectedMovie();

  // Loading state
  if (isLoading) {
    return (
      <PageWrapper>
        <LoadingState />
      </PageWrapper>
    );
  }

  // Error state
  if (isError && error) {
    return (
      <PageWrapper>
        <MovieDetailsErrorView error={error} onGoHome={handleGoHome} />
      </PageWrapper>
    );
  }

  // Movie not found
  if (isNotFound) {
    return (
      <PageWrapper>
        <MovieDetailsNotFoundView onGoHome={handleGoHome} />
      </PageWrapper>
    );
  }

  // Success: render full hero with all details
  if (selectedMovie) {
    return (
      <PageWrapper>
        <MovieDetailsHero
          backdropUrl={backdropUrl}
          posterUrl={posterUrl}
          title={selectedMovie.title}
          voteAverage={selectedMovie.voteAverage}
          runtime={selectedMovie.runtime}
          releaseYear={releaseYear}
          formattedReleaseDate={formattedReleaseDate}
          genres={selectedMovie.genres}
          overview={selectedMovie.overview}
          onBack={handleBack}
          onOpenTmdb={handleOpenTMDB}
        />
      </PageWrapper>
    );
  }

  // Fallback (should not reach here)
  return (
    <PageWrapper>
      <MovieDetailsNotFoundView onGoHome={handleGoHome} />
    </PageWrapper>
  );
};
