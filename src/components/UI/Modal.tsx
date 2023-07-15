import React from 'react';

interface ModalInterface {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
}

// eslint-disable-next-line object-curly-newline
const Modal: React.FC<ModalInterface> = ({ isOpen, title, body, footer }) => (
  <div
    className={`
      ${!isOpen && 'hidden'} 
      fixed 
      top-0 
      bottom-0 
      left-0
      right-0 
      z-50 flex
      items-center
      justify-center
      w-full
      overflow-x-hidden
      overflow-y-auto
      bg-[rgba(0,0,0,0.74)]
      px-6
    `}
  >
    <div className="w-full max-w-[475px] bg-[#363636] px-5 py-5">
      <header className="pb-4 border-b">
        <h3 className="text-xl min-[475px]:text-2xl text-center text-[#3d3d3d] dark:text-[#ffffffdd]">
          {title}
        </h3>
      </header>
      <section className="mt-12">
        {body}
        {footer}
      </section>
    </div>
  </div>
);

export default Modal;
