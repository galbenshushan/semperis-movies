import React from 'react';
import {
  CastContainer,
  CastTitle,
  CastList as StyledCastList,
  CastItem,
  CastName,
  CastCharacter,
} from './CastList.styled';
import type { CastMember } from '../../../types/movie';

interface CastListProps {
  cast: CastMember[];
}

/**
 * CastList: Presentational component that displays movie cast members.
 * All data is passed as props, no logic or hooks.
 */
export const CastList: React.FC<CastListProps> = ({ cast }) => {
  if (cast.length === 0) {
    return null;
  }

  return (
    <CastContainer>
      <CastTitle>Cast</CastTitle>
      <StyledCastList>
        {cast.map((member) => (
          <CastItem key={member.id}>
            <CastName>{member.name}</CastName>
            {member.character && <CastCharacter>as {member.character}</CastCharacter>}
          </CastItem>
        ))}
      </StyledCastList>
    </CastContainer>
  );
};
