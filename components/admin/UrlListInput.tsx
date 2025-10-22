"use client";

// URL List Input Component
// Add/remove list of URL paths for targeting

import { useState } from "react";

interface UrlListInputProps {
  value?: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder?: string;
}

export default function UrlListInput({
  value = [],
  onChange,
  label,
  placeholder = "/path/to/page",
}: UrlListInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b] focus:border-[#12213b] text-sm"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-[#12213b] text-white rounded-md hover:bg-[#12213b]/90 text-sm font-medium"
        >
          Add
        </button>
      </div>
      {value.length > 0 && (
        <div className="space-y-1 mt-2">
          {value.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
            >
              <span className="text-sm text-gray-700">{url}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-500">
        Use wildcards: /products/* or exact paths: /about
      </p>
    </div>
  );
}
