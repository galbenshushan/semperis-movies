import React, { useMemo } from 'react';
import { Tooltip } from '@mui/material';
import { OpenInNew as ExpandIcon } from '@mui/icons-material';
import type { CastMember } from '../../../types/movie';

import {
  CastCharacter,
  CastContainer,
  CastIconWrapper,
  CastItem,
  CastList as StyledCastList,
  CastName,
  CastTitle,
} from './CastList.styled';

interface CastListProps {
  cast: CastMember[];
  onCastMemberClick?: (castMember: CastMember) => void;
}

/**
 * CastList: Presentational component that displays movie cast members.
 * Supports clicking on cast members to view detailed information.
 */
const CastListComponent: React.FC<CastListProps> = ({ cast, onCastMemberClick }) => {
  // Memoize rendered cast items to prevent re-creating them on every render
  const renderedCast = useMemo(
    () =>
      cast.map((member) => (
        <Tooltip key={member.id} title="Click to view details" arrow>
          <CastItem onClick={() => onCastMemberClick?.(member)}>
            <div>
              <CastName>{member.name}</CastName>
              {member.character && <CastCharacter>as {member.character}</CastCharacter>}
            </div>
            <CastIconWrapper>
              <ExpandIcon />
            </CastIconWrapper>
          </CastItem>
        </Tooltip>
      )),
    [cast, onCastMemberClick],
  );

  if (cast.length === 0) {
    return null;
  }

  return (
    <CastContainer>
      <CastTitle>Cast</CastTitle>
      <StyledCastList>{renderedCast}</StyledCastList>
    </CastContainer>
  );
};

/**
 * Wrap with React.memo to prevent re-renders unless the cast prop changes.
 * This is important because CastList is called from MovieDetailsHero, and
 * memoizing it prevents unnecessary re-renders when parent props change.
 */
export const CastList = React.memo(CastListComponent);
