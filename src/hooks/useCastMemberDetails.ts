import { useState, useCallback } from 'react';
import { fetchPersonDetails } from '../services/tmdbService';
import type { CastMember } from '../types/movie';

interface UseCastMemberDetailsReturn {
  selectedCastMember: CastMember | null;
  isModalOpen: boolean;
  loading: boolean;
  error: string | null;
  handleCastMemberClick: (castMember: CastMember) => Promise<void>;
  handleCloseModal: () => void;
}

/**
 * Custom hook for managing cast member details, modal state, and fetching
 */
export const useCastMemberDetails = (): UseCastMemberDetailsReturn => {
  const [selectedCastMember, setSelectedCastMember] = useState<CastMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCastMemberClick = useCallback(async (castMember: CastMember): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const personDetails = await fetchPersonDetails(castMember.id);

      // Merge the detailed person information with existing cast member data
      const enrichedCastMember: CastMember = {
        ...castMember,
        birthday: personDetails.birthday,
        deathday: personDetails.deathday,
        placeOfBirth: personDetails.placeOfBirth,
        biography: personDetails.biography ?? undefined,
        profilePath: personDetails.profilePath || castMember.profilePath,
      };

      setSelectedCastMember(enrichedCastMember);
      setIsModalOpen(true);
      setLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch cast member details';
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCastMember(null);
    setError(null);
  }, []);

  return {
    selectedCastMember,
    isModalOpen,
    loading,
    error,
    handleCastMemberClick,
    handleCloseModal,
  };
};
