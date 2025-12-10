import React from 'react';
import type { CastMember } from '../../../types/movie';
import { InfoSection, Name, InfoRow, Label, Value } from './CastMemberModal.styled';
import { BiographyBlock } from './BiographyBlock';

interface CastMemberInfoBlockProps {
  castMember: CastMember;
  formattedBirthday: string | null;
  age: number | null;
}

/**
 * CastMemberInfoBlock: Renders cast member details (name, character, birth info, biography)
 */
const CastMemberInfoBlockComponent: React.FC<CastMemberInfoBlockProps> = ({
  castMember,
  formattedBirthday,
  age,
}) => (
  <InfoSection>
    <Name>{castMember.name}</Name>

    {castMember.character && (
      <InfoRow>
        <Label>Character</Label>
        <Value>{castMember.character}</Value>
      </InfoRow>
    )}

    {formattedBirthday && (
      <InfoRow>
        <Label>Born</Label>
        <Value>
          {formattedBirthday}
          {age !== null && ` (Age ${age})`}
        </Value>
      </InfoRow>
    )}

    {castMember.placeOfBirth && (
      <InfoRow>
        <Label>Place of Birth</Label>
        <Value>{castMember.placeOfBirth}</Value>
      </InfoRow>
    )}

    <BiographyBlock biography={castMember.biography} />
  </InfoSection>
);

export const CastMemberInfoBlock = React.memo(CastMemberInfoBlockComponent);
