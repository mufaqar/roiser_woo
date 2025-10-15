"use client";

import React from "react";
import { parseVideoUrl, getYouTubeEmbedUrl } from "@/lib/video-utils";

interface VideoPlayerProps {
  videoUrl: string;
  autoplay?: boolean;
  className?: string;
  posterImage?: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  autoplay = false,
  className = "",
  posterImage = null
}) => {
  const videoInfo = parseVideoUrl(videoUrl);

  if (!videoInfo) {
    return (
      <div className={`relative w-full h-full bg-gray-100 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Unable to load video</p>
      </div>
    );
  }

  if (videoInfo.type === 'youtube' && videoInfo.youtubeId) {
    return (
      <div className={`relative w-full h-full bg-black ${className}`}>
        <iframe
          src={getYouTubeEmbedUrl(videoInfo.youtubeId, autoplay)}
          title="Product Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  // Direct video URL (self-hosted or CDN)
  // Following Next.js best practices for video optimization
  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <video
        src={videoInfo.url}
        poster={posterImage || undefined}
        controls
        autoPlay={autoplay}
        muted={autoplay}
        playsInline // Enable inline playback on iOS
        preload={autoplay ? "auto" : "metadata"} // Load only metadata when not autoplaying
        className="absolute inset-0 w-full h-full object-contain"
        aria-label="Product demonstration video"
      >
        <p className="text-white p-4">
          Your browser does not support the video tag.
          <a href={videoInfo.url} className="underline ml-1" download>
            Download the video
          </a>
        </p>
      </video>
    </div>
  );
};

export default VideoPlayer;
