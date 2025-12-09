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
  OverviewText,
  GenresContainer,
  GenreChip,
  DirectorContainer,
  DirectorLabel,
  DirectorName,
  ButtonContainer,
  BackButton,
  TMDBButton,
  ReleaseDate,
  SynopsisTitle,
} from '../../../pages/MovieDetailsPage/MovieDetailsPage.styled';
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
  director,
  cast,
  onBack,
  onOpenTmdb,
}) => {
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
              <RatingBadge>★ {voteAverage.toFixed(1)}/10</RatingBadge>
              {runtime > 0 && <RuntimeText>{runtime} min</RuntimeText>}
              {releaseYear && <RuntimeText>({releaseYear})</RuntimeText>}
            </HeroMetaRow>

            {formattedReleaseDate && <ReleaseDate>Released: {formattedReleaseDate}</ReleaseDate>}

            {genres.length > 0 && (
              <div>
                <GenresContainer>
                  {genres.map((genre) => (
                    <GenreChip key={genre.id} label={genre.name} size="small" />
                  ))}
                </GenresContainer>
              </div>
            )}

            {overview && (
              <div>
                <SynopsisTitle>Synopsis</SynopsisTitle>
                <OverviewText>{overview}</OverviewText>
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
