import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "default" | "destructive";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle =
    "px-4 py-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-black",
    outline: "border border-black text-black focus:ring-black",
    destructive: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const disabledStyle =
    "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300";

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${baseStyle} ${
        disabled ? disabledStyle : variants[variant]
      } ${className}`}
    />
  );
};
