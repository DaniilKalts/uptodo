import React, { useEffect } from 'react';

import { cn } from '@/utils/Cn';

import { motion } from 'framer-motion';

interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  modalAlign?: 'items-center' | 'items-end';
  outsideClose?: boolean;
  title?: string;
  noPaddingX?: boolean;
  body: React.ReactNode;
  footer?: React.ReactNode;
  bgType: 'blur' | 'dark';
  motionConfig: null | object;
}

const Modal: React.FC<ModalInterface> = ({
  isOpen,
  onClose,
  modalAlign,
  outsideClose,
  title,
  noPaddingX,
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  return (
    <motion.div
      {...motionConfig}
      className={cn(
        'fixed bottom-0 left-0 right-0 top-0 z-50 flex w-full justify-center overflow-y-auto overflow-x-hidden',
        modalAlign || 'items-center',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        noPaddingX ? 'px-0' : 'px-6',
        bgClassName(),
      )}
      onClick={outsideClose ? () => onClose() : () => {}}
    >
      <div
        className={
          footer
            ? 'max-h-full w-full max-w-[500px] overflow-y-auto bg-gray-700 px-5 py-5'
            : ''
        }
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <header className="border-b pb-4">
            <h3 className="text-center text-xl text-white-pale min-[500px]:text-2xl">
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
