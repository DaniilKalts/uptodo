import React from 'react';

const AddIcon: React.FC<{ customStyles: string }> = ({ customStyles }) => (
  <svg
    className={customStyles}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
  >
    <g clipPath="url(#clip0_2_14148)">
      <path
        d="M2.4375 17.9375H14.0625V29.5625C14.0625 30.631 14.9315 31.5 16 31.5C17.0685 31.5 17.9375 30.631 17.9375 29.5625V17.9375H29.5625C30.631 17.9375 31.5 17.0685 31.5 16C31.5 14.9315 30.631 14.0625 29.5625 14.0625H17.9375V2.4375C17.9375 1.36896 17.0685 0.5 16 0.5C14.9315 0.5 14.0625 1.36896 14.0625 2.4375V14.0625H2.4375C1.36896 14.0625 0.5 14.9315 0.5 16C0.5 17.0685 1.36896 17.9375 2.4375 17.9375Z"
        fill="#00A369"
      />
    </g>
    <defs>
      <clipPath id="clip0_2_14148">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default AddIcon;
