import React, { useMemo } from 'react';
import type { CastMember } from '../../../types/movie';

import {
  CastCharacter,
  CastContainer,
  CastItem,
  CastList as StyledCastList,
  CastName,
  CastTitle,
} from './CastList.styled';

interface CastListProps {
  cast: CastMember[];
}

/**
 * CastList: Presentational component that displays movie cast members.
 */
const CastListComponent: React.FC<CastListProps> = ({ cast }) => {
  
  // Memoize rendered cast items to prevent re-creating them on every render
  const renderedCast = useMemo(
    () =>
      cast.map((member) => (
        <CastItem key={member.id}>
          <CastName>{member.name}</CastName>
          {member.character && <CastCharacter>as {member.character}</CastCharacter>}
        </CastItem>
      )),
    [cast],
  );

  if (cast.length === 0) {
    return null;
  }

  return (
    <CastContainer>
      <CastTitle>Cast</CastTitle>
      <StyledCastList>
        {renderedCast}
      </StyledCastList>
    </CastContainer>
  );
};

/**
 * Wrap with React.memo to prevent re-renders unless the cast prop changes.
 * This is important because CastList is called from MovieDetailsHero, and
 * memoizing it prevents unnecessary re-renders when parent props change.
 */
export const CastList = React.memo(CastListComponent);
