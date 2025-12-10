import React from 'react';
import { Modal, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { CastMember } from '../../../types/movie';
import { useCastMemberModal } from '../../../hooks/useCastMemberModal';
import { ModalContent, CloseButton, ModalGrid } from './CastMemberModal.styled';
import { ProfileBlock } from './ProfileBlock';
import { CastMemberInfoBlock } from './CastMemberInfoBlock';

interface CastMemberModalProps {
  castMember: CastMember | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * CastMemberModal: Main component displaying cast member details in an MUI Modal
 * Composes smaller sub-components (ProfileBlock, CastMemberInfoBlock, BiographyBlock)
 */
const CastMemberModalComponent: React.FC<CastMemberModalProps> = ({
  castMember,
  isOpen,
  onClose,
}) => {
  const { profileImageUrl, formattedBirthday, age, handleOverlayClick } = useCastMemberModal({
    castMember,
    isOpen,
    onClose,
  });

  if (!castMember || !isOpen) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="cast-member-modal-title"
      aria-describedby="cast-member-modal-content"
    >
      <Box onClick={handleOverlayClick}>
        <ModalContent>
          <CloseButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </CloseButton>

          <ModalGrid>
            <ProfileBlock profileImageUrl={profileImageUrl} name={castMember.name} />
            <CastMemberInfoBlock
              castMember={castMember}
              formattedBirthday={formattedBirthday}
              age={age}
            />
          </ModalGrid>
        </ModalContent>
      </Box>
    </Modal>
  );
};

/**
 * Wrap with React.memo to prevent unnecessary re-renders
 */
export const CastMemberModal = React.memo(CastMemberModalComponent);
