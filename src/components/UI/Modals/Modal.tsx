import React from 'react';

interface ModalInterface {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
}

const Modal: React.FC<ModalInterface> = ({ isOpen, title, body, footer }) => (
  <div
    className={`
      ${!isOpen && 'hidden'} 
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
      bg-[rgba(0,0,0,0.74)]
      px-6
    `}
  >
    <div className="w-full max-w-[475px] bg-[#363636] px-5 py-5">
      <header className="border-b pb-4">
        <h3 className="text-center text-xl text-[#ffffffdd] min-[475px]:text-2xl">
          {title}
        </h3>
      </header>
      <main className="mt-12">{body}</main>
      <footer>{footer}</footer>
    </div>
  </div>
);

export default Modal;
