import React from 'react';
import Image from 'next/image';

import Modal from './Modal';

interface AvatarModalInterface {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const AvatarModal: React.FC<AvatarModalInterface> = ({
  isOpen,
  onClose,
  imageUrl,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    outsideClose
    body={
      <Image
        src={imageUrl}
        className="h-60 w-60 rounded-full object-cover min-[500px]:h-72 min-[500px]:w-72"
        width={216}
        height={216}
        alt="Avatar"
        onDragStart={(e) => e.preventDefault()}
      />
    }
    bgType="blur"
    motionConfig={{
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.85 },
      transition: { duration: 0.1 },
    }}
  />
);

export default AvatarModal;
