import React, { useMemo } from 'react';
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
const MovieDetailsPageComponent: React.FC = () => {
  const hookReturn = useSelectedMovie();
  const {
    selectedMovie,
    posterUrl,
    backdropUrl,
    releaseYear,
    formattedReleaseDate,
    director,
    cast,
    handleBack,
    handleGoHome,
    handleOpenTMDB,
    isLoading,
    isError,
    isNotFound,
    error,
  } = hookReturn;

  // Memoize genres array to prevent re-creating it on every render
  const genresMemo = useMemo(() => selectedMovie?.genres || [], [selectedMovie?.genres]);

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
          genres={genresMemo}
          overview={selectedMovie.overview}
          director={director}
          cast={cast}
          onBack={handleBack}
          onOpenTmdb={handleOpenTMDB}
        />
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
};

/**
 * Wrap with React.memo to prevent re-renders unless the component's props change.
 * Since this component has no props, memoization will prevent parent re-renders.
 * The key optimization is useMemo in the hook itself to prevent object reference changes.
 */
export const MovieDetailsPage = React.memo(MovieDetailsPageComponent);
