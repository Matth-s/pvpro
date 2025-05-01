import React from 'react';

type FormSuccessMessageProps = {
  message?: string;
};

const FormSuccessMessage = ({ message }: FormSuccessMessageProps) => {
  if (!message) return null;

  return (
    <div className="bg-green-100 text-center font-semibold text-green-700 border border-green-300 px-4 py-2 rounded-lg text-sm shadow-md">
      {message}
    </div>
  );
};

export default FormSuccessMessage;
