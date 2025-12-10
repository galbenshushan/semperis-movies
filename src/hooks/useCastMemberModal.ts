import { useEffect, useMemo, useCallback } from 'react';
import type { CastMember } from '../types/movie';
import {
  calculateAgeFromBirthday,
  formatBirthday,
  buildProfileImageUrl,
} from '../utils/castMemberUtils';

interface UseCastMemberModalProps {
  castMember: CastMember | null;
  isOpen: boolean;
  onClose: () => void;
}

interface UseCastMemberModalReturn {
  age: number | null;
  formattedBirthday: string | null;
  profileImageUrl: string | null;
  handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Custom hook for managing cast member modal logic and side effects
 * Handles:
 * - Computing derived values (age, formatted birthday, image URL)
 * - ESC key handling to close the modal
 * - Overlay click handling
 */
export const useCastMemberModal = ({
  castMember,
  isOpen,
  onClose,
}: UseCastMemberModalProps): UseCastMemberModalReturn => {
  // Memoize computed values using utility functions
  const age = useMemo(() => calculateAgeFromBirthday(castMember?.birthday), [castMember?.birthday]);

  const formattedBirthday = useMemo(
    () => formatBirthday(castMember?.birthday),
    [castMember?.birthday],
  );

  const profileImageUrl = useMemo(
    () => buildProfileImageUrl(castMember?.profilePath),
    [castMember?.profilePath],
  );

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Memoized overlay click handler
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  return {
    age,
    formattedBirthday,
    profileImageUrl,
    handleOverlayClick,
  };
};
