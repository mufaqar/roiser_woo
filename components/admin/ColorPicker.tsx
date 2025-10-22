"use client";

// Color Picker Component
// Simple color input with hex validation

import { useState, useEffect } from "react";

interface ColorPickerProps {
  value?: string;
  onChange: (value: string) => void;
  label: string;
  defaultColor?: string;
}

export default function ColorPicker({
  value,
  onChange,
  label,
  defaultColor = "#000000",
}: ColorPickerProps) {
  const [color, setColor] = useState(value || defaultColor);

  useEffect(() => {
    setColor(value || defaultColor);
  }, [value, defaultColor]);

  const handleChange = (newColor: string) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="color"
          value={color}
          onChange={(e) => handleChange(e.target.value)}
          className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="#000000"
          pattern="^#([0-9a-fA-F]{3}){1,2}$"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b] focus:border-[#12213b] text-sm"
        />
      </div>
    </div>
  );
}
