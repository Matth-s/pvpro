import React from 'react';

type FormRootMessageProps = {
  message?: string;
};

const FormRootMessage = ({ message }: FormRootMessageProps) => {
  if (!message) return null;

  return (
    <div className="bg-pink-100 text-center font-semibold text-pink-700 border border-pink-300 px-4 py-2 rounded-lg text-sm shadow-md">
      {message}
    </div>
  );
};

export default FormRootMessage;
