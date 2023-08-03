import React from 'react';

import { motion } from 'framer-motion';

interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
  bgType: 'blur' | 'dark';
  motionConfig: null | object;
}

const Modal: React.FC<ModalInterface> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  bgType,
  motionConfig,
}) => {
  const bgClassName = () => {
    if (bgType === 'dark') {
      return 'bg-[rgba(0,0,0,0.74)]';
    }
    if (bgType === 'blur') {
      return 'backdrop-filter backdrop-blur';
    }
  };

  return (
    <motion.div
      {...motionConfig}
      className={`
        ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        fixed
        bottom-0 
        left-0
        right-0
        top-0 
        z-50 flex
        w-full
        items-center
        justify-center
        overflow-y-auto
        overflow-x-hidden
        ${bgClassName()}
        px-6
      `}
      onClick={onClose}
    >
      <div
        className={footer ? 'w-full max-w-[475px] bg-gray-700 px-5 py-5' : ''}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <header className="border-b pb-4">
            <h3 className="text-center text-xl text-white-pale min-[475px]:text-2xl">
              {title}
            </h3>
          </header>
        ) : (
          ''
        )}
        <main className="flex justify-center">{body}</main>
        <footer>{footer}</footer>
      </div>
    </motion.div>
  );
};

export default Modal;
