import React from "react";

export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800 border border-blue-200",
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    danger: "bg-red-100 text-red-700 border border-red-200",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
};
