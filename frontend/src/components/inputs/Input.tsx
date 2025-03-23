import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`border px-3 py-2 rounded-xl w-full text-black focus:outline-none focus:ring-2 focus:ring-black ${className}`}
    />
  );
};
