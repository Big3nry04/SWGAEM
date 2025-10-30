import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-md rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold text-gray-800">{children}</h2>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
