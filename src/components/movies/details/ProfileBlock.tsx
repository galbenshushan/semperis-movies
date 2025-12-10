import React from 'react';
import { ProfileImageCard, ProfileImage, ProfilePlaceholder } from './CastMemberModal.styled';

interface ProfileBlockProps {
  profileImageUrl: string | null;
  name: string;
}

/**
 * ProfileBlock: Renders the cast member's profile image or placeholder
 */
const ProfileBlockComponent: React.FC<ProfileBlockProps> = ({ profileImageUrl, name }) => (
  <ProfileImageCard>
    {profileImageUrl ? (
      <ProfileImage src={profileImageUrl} alt={name} />
    ) : (
      <ProfilePlaceholder>No Image Available</ProfilePlaceholder>
    )}
  </ProfileImageCard>
);

export const ProfileBlock = React.memo(ProfileBlockComponent);
