'use client';

import React from 'react';

type BackButtonAuthFormProps = {
  onCLick: () => void;
};

const BackButtonAuthForm = ({ onCLick }: BackButtonAuthFormProps) => {
  return (
    <button
      className="w-fit mb-2 cursor-pointer hover:underline"
      onClick={() => onCLick()}
    >
      Back
    </button>
  );
};

export default BackButtonAuthForm;
