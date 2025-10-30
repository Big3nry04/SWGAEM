import React, { useState } from "react";

export const Select = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
export const SelectValue = ({ placeholder, value }) => (
  <>{value || placeholder}</>
);
