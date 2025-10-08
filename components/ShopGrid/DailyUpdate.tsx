"use client"
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaHeart, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Initial video data - NOTICE: no 'thumbnail' property here, it will be generated
const initialVideos = [
  {
    id: 1,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '84',
    views: '',
    caption: 'You know that moment when the day\'s done and the sofa\'s calling? 😌',
    alt: 'Person walking towards a sofa',
  },
  {
    id: 2,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '418',
    views: '',
    caption: 'Why settle for a traditional 3+2 sofa setup',
    alt: 'Home cinema setup with orange lighting',
  },
  {
    id: 3,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '418',
    views: '',
    caption: 'You know that one corner of the house that just feels different...',
    alt: 'Woman relaxing in a recliner chair',
  },
  {
    id: 4,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '893',
    views: '',
    caption: 'Designers hate this one sofa hack 😉',
    alt: 'Woman demonstrating a sofa hack',
  },
  {
    id: 5,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '149',
    views: '',
    caption: 'WAIT... WHAT IS BRO DOING 🤯',
    alt: 'Man trying to open a drink holder on a sofa',
  },
  {
    id: 6,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '72',
    views: '',
    caption: 'Another great sofa moment.',
    alt: 'Another sofa moment',
  },
   {
    id: 7,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '72',
    views: '',
    caption: 'Relaxing evening vibes.',
    alt: 'Relaxing evening vibes on sofa',
  },
   {
    id: 8,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '72',
    views: '',
    caption: 'Modern living room setup.',
    alt: 'Modern living room',
  },
   {
    id: 9,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '72',
    views: '',
    caption: 'Comfort meets style.',
    alt: 'Comfortable stylish sofa',
  },
   {
    id: 10,
    videoSrc: '/video/WhatsApp Video 2025-10-02 at 20.00.22_75063cda.mp4',
    likes: '72',
    views: '',
    caption: 'The perfect spot to unwind.',
    alt: 'Perfect spot to unwind',
  },
];

function DailyUpdate() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  // State to store generated thumbnails (mapping video ID to data URL)
  const [videoThumbnails, setVideoThumbnails] = useState<Record<number, string>>({});
  
  // Refs for temporary video elements used to generate thumbnails
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  // Function to generate a thumbnail from a video
  const generateThumbnail = (videoElement: HTMLVideoElement, videoId: number) => {
    // Only generate if we don't already have one
    if (videoThumbnails[videoId] || !videoElement) return;

    // Set a timeout to ensure the video has loaded enough metadata
    videoElement.onloadedmetadata = () => {
      // Try to seek to 1 second into the video, or 0 if too short
      videoElement.currentTime = Math.min(1, videoElement.duration / 2 || 0);
    };

    videoElement.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg'); // or 'image/png'
        setVideoThumbnails(prev => ({ ...prev, [videoId]: dataUrl }));
      }
      // Clean up the event listener to avoid multiple calls
      videoElement.onseeked = null;
    };

    videoElement.onerror = () => {
      console.error(`Failed to load video for thumbnail generation: ${videoElement.src}`);
      // Fallback to a default image if video fails to load
      setVideoThumbnails(prev => ({ ...prev, [videoId]: '/images/default-video-thumbnail.jpg' }));
    };

    // Trigger loading if not already loaded
    videoElement.load();
  };

  // Effect to generate thumbnails for all videos on mount
  useEffect(() => {
    initialVideos.forEach(video => {
      // Create a temporary, off-DOM video element to load the video and extract a frame
      const tempVideo = document.createElement('video');
      tempVideo.src = video.videoSrc;
      tempVideo.crossOrigin = "anonymous"; // Important for CORS if videos are from different domain
      tempVideo.preload = "metadata"; // Only load metadata, not the whole video
      videoRefs.current[video.id] = tempVideo; // Store ref for potential cleanup or reuse
      generateThumbnail(tempVideo, video.id);
    });

    // Cleanup function: revoke object URLs if any were created for video sources, though not strictly necessary for file paths
    return () => {
      Object.values(videoRefs.current).forEach(videoElement => {
        if (videoElement) {
          videoElement.onloadedmetadata = null;
          videoElement.onseeked = null;
          videoElement.onerror = null;
        }
      });
    };
  }, []); // Run once on mount

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Pause any playing video when scrolling
      setPlayingVideoId(null); 
      const scrollAmount = 300; // Adjust scroll distance as needed
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleVideoClick = (videoId: number) => {
    setPlayingVideoId(videoId);
  };

  const handleVideoEnded = () => {
    setPlayingVideoId(null); // Reset when video ends
  };

  return (
    <div className="relative w-full overflow-hidden bg-white py-8">
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-scroll no-scrollbar px-4 md:px-8 lg:px-12"
      >
        {initialVideos.map((video) => (
          <div
            key={video.id}
            className="relative flex-none w-60 h-96 bg-gray-100 rounded-lg shadow-md overflow-hidden group"
            onClick={() => playingVideoId !== video.id && handleVideoClick(video.id)} // Only handle click if not already playing
          >
            {playingVideoId === video.id ? (
              <video
                src={video.videoSrc}
                controls
                autoPlay
                muted={false} 
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
                key={`video-player-${video.id}`} // Unique key for the actual player
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <Image
                  // Use the generated thumbnail from state, with a fallback to a default image
                  src={videoThumbnails[video.id] || '/images/default-video-thumbnail.jpg'} 
                  alt={video.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  // Key here helps Next.js Image component update its src if thumbnail generates later
                  key={`video-thumbnail-${video.id}-${videoThumbnails[video.id] ? 'generated' : 'loading'}`}
                />
                {/* Overlay with gradient and text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaPlay className="text-white text-4xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Likes/Views */}
                <div className="absolute top-4 left-4 flex items-center text-white text-sm font-semibold bg-black bg-opacity-40 px-2 py-1 rounded-full z-10">
                  <FaHeart className="mr-1 text-red-400" /> {video.likes}
                  {video.views && (
                    <>
                      <FaEye className="ml-3 mr-1" /> {video.views}
                    </>
                  )}
                </div>

                {/* Caption */}
                {video.caption && (
                  <div className="absolute bottom-4 left-4 right-4 text-white text-sm z-10">
                    <p className="font-light leading-snug">{video.caption}</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full shadow-lg z-20 hidden md:block"
      >
        <FaChevronLeft className="text-gray-800 text-lg" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full shadow-lg z-20 hidden md:block"
      >
        <FaChevronRight className="text-gray-800 text-lg" />
      </button>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}

export default DailyUpdate;