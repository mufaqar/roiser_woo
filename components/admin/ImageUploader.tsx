"use client";

// Image Uploader Component
// MVP: URL input only (future: file upload)

import { useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  value?: string;
  onChange: (value: string) => void;
  label: string;
}

export default function ImageUploader({
  value,
  onChange,
  label,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState(value || "");
  const [imageError, setImageError] = useState(false);

  const handleChange = (url: string) => {
    setImageUrl(url);
    setImageError(false);
    onChange(url);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b] focus:border-[#12213b] text-sm"
      />
      {imageUrl && (
        <div className="mt-2 relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
          {!imageError ? (
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-sm">Invalid image URL</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
