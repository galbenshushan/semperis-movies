import React from 'react';
import {
  BiographySection,
  BiographyTitle,
  BiographyText,
  EmptyBiography,
} from './CastMemberModal.styled';

interface BiographyBlockProps {
  biography?: string | null;
}

/**
 * BiographyBlock: Renders the biography section
 */
const BiographyBlockComponent: React.FC<BiographyBlockProps> = ({ biography }) => (
  <BiographySection>
    <BiographyTitle>Biography</BiographyTitle>
    {biography ? (
      <BiographyText>{biography}</BiographyText>
    ) : (
      <EmptyBiography>No biography available</EmptyBiography>
    )}
  </BiographySection>
);

export const BiographyBlock = React.memo(BiographyBlockComponent);
