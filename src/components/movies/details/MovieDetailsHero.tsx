import React from 'react';
import {
  HeroSection,
  HeroContent,
  MainGrid,
  PosterCard,
  PosterImage,
  PosterPlaceholder,
  HeroInfoSection,
  HeroTitle,
  HeroMetaRow,
  RatingBadge,
  RuntimeText,
  GenresContainer,
  DirectorContainer,
  DirectorLabel,
  DirectorName,
  ButtonContainer,
  BackButton,
  TMDBButton,
  ReleaseDate,
  SynopsisTitle,
  OverviewText,
} from '../../../pages/MovieDetailsPage/MovieDetailsPage.styled';
import { useMovieDetailsHeroMemo } from '../../../hooks/useMovieDetailsHeroMemo';
import { GenreChipList } from './GenreChipList';
import { CastList } from './CastList';
import type { CastMember } from '../../../types/movie';

interface MovieDetailsHeroProps {
  backdropUrl: string | undefined;
  posterUrl: string | null;
  title: string;
  voteAverage: number;
  runtime: number;
  releaseYear: number | null;
  formattedReleaseDate: string | null;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  director: string | null;
  cast: CastMember[];
  onBack: () => void;
  onOpenTmdb: () => void;
}

/**
 * MovieDetailsHero: Presentational component that displays full movie details.
 */
const MovieDetailsHeroComponent: React.FC<MovieDetailsHeroProps> = ({
  backdropUrl,
  posterUrl,
  title,
  voteAverage,
  runtime,
  releaseYear,
  formattedReleaseDate,
  genres,
  overview,
  director,
  cast,
  onBack,
  onOpenTmdb,
}) => {
  // Use the custom hook to get all memoized computed values
  const { ratingString, runtimeString, releaseYearString, memoizedOverview } =
    useMovieDetailsHeroMemo({
      genres,
      voteAverage,
      runtime,
      releaseYear,
      overview,
    });
  return (
    <HeroSection $backdropUrl={backdropUrl}>
      <HeroContent>
        <MainGrid>
          <PosterCard>
            {posterUrl ? (
              <PosterImage src={posterUrl} alt={title} loading="lazy" />
            ) : (
              <PosterPlaceholder>No Poster Available</PosterPlaceholder>
            )}
          </PosterCard>

          <HeroInfoSection>
            <HeroTitle>{title}</HeroTitle>

            <HeroMetaRow>
              <RatingBadge>{ratingString}</RatingBadge>
              {runtime > 0 && <RuntimeText>{runtimeString}</RuntimeText>}
              {releaseYear && <RuntimeText>{releaseYearString}</RuntimeText>}
            </HeroMetaRow>

            {formattedReleaseDate && <ReleaseDate>Released: {formattedReleaseDate}</ReleaseDate>}

            {genres.length > 0 && (
              <div>
                <GenresContainer>
                  <GenreChipList genres={genres} />
                </GenresContainer>
              </div>
            )}

            {memoizedOverview && (
              <div>
                <SynopsisTitle>Synopsis</SynopsisTitle>
                <OverviewText>{memoizedOverview}</OverviewText>
              </div>
            )}

            {director && (
              <DirectorContainer>
                <DirectorLabel>Director</DirectorLabel>
                <DirectorName>{director}</DirectorName>
              </DirectorContainer>
            )}

            <CastList cast={cast} />

            <ButtonContainer>
              <BackButton onClick={onBack}>← Back</BackButton>
              <TMDBButton onClick={onOpenTmdb}>View on TMDB ↗</TMDBButton>
            </ButtonContainer>
          </HeroInfoSection>
        </MainGrid>
      </HeroContent>
    </HeroSection>
  );
};

/**
 * Wrap with React.memo to prevent re-renders unless props change.
 * This is crucial because it prevents re-rendering when the parent (MovieDetailsPage)
 * re-renders for unrelated reasons.
 */
export const MovieDetailsHero = React.memo(MovieDetailsHeroComponent);
