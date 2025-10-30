import React from "react";

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
  className = "",
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${className}`}
    />
  );
}
