import React from 'react';
import {
  HeroSection,
  HeroContent,
  MainGrid,
  PosterCard,
  PosterImage,
  PosterPlaceholder,
  InfoSection,
  HeroInfoSection,
  HeroTitle,
  HeroMetaRow,
  RatingBadge,
  MetaInfo,
  GenresContainer,
  GenreChip,
  OverviewSection,
  SectionLabel,
  Overview,
  ActionsSection,
  PrimaryButton,
  SecondaryButton,
} from '../../../pages/MovieDetailsPage/MovieDetailsPage.styled';

export interface MovieDetailsHeroProps {
  backdropUrl: string | undefined;
  posterUrl: string | null;
  title: string;
  voteAverage: number;
  runtime: number;
  releaseYear: number | null;
  formattedReleaseDate: string | null;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  onBack: () => void;
  onOpenTmdb: () => void;
}

/**
 * Presentational component that renders the full cinematic hero section with all movie details.
 * Receives all data and callbacks via props.
 */
export const MovieDetailsHero: React.FC<MovieDetailsHeroProps> = ({
  backdropUrl,
  posterUrl,
  title,
  voteAverage,
  runtime,
  releaseYear,
  formattedReleaseDate,
  genres,
  overview,
  onBack,
  onOpenTmdb,
}) => {
  return (
    <HeroSection $backdropUrl={backdropUrl}>
      <HeroContent>
        <MainGrid>
          {/* Floating Poster Card */}
          <PosterCard>
            {posterUrl ? (
              <PosterImage src={posterUrl} alt={title} loading="lazy" />
            ) : (
              <PosterPlaceholder>No Poster Available</PosterPlaceholder>
            )}
          </PosterCard>

          {/* Info Section: Title, metadata, genres, synopsis, actions */}
          <InfoSection>
            {/* Title and Basic Metadata */}
            <HeroInfoSection>
              <HeroTitle>{title}</HeroTitle>
              <HeroMetaRow>
                <RatingBadge>★ {voteAverage.toFixed(1)}/10</RatingBadge>
                {runtime > 0 && <MetaInfo>{runtime} min</MetaInfo>}
                {releaseYear && <MetaInfo>({releaseYear})</MetaInfo>}
              </HeroMetaRow>
            </HeroInfoSection>

            {/* Release Date */}
            {formattedReleaseDate && (
              <div>
                <SectionLabel>Release Date</SectionLabel>
                <MetaInfo>{formattedReleaseDate}</MetaInfo>
              </div>
            )}

            {/* Genres */}
            {genres.length > 0 && (
              <div>
                <SectionLabel>Genres</SectionLabel>
                <GenresContainer>
                  {genres.map((genre) => (
                    <GenreChip key={genre.id} label={genre.name} size="small" />
                  ))}
                </GenresContainer>
              </div>
            )}

            {/* Overview */}
            {overview && (
              <OverviewSection>
                <SectionLabel>Synopsis</SectionLabel>
                <Overview>{overview}</Overview>
              </OverviewSection>
            )}

            {/* Actions */}
            <ActionsSection>
              <PrimaryButton onClick={onBack}>← Back</PrimaryButton>
              <SecondaryButton onClick={onOpenTmdb}>Open in TMDB ↗</SecondaryButton>
            </ActionsSection>
          </InfoSection>
        </MainGrid>
      </HeroContent>
    </HeroSection>
  );
};
