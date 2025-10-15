/**
 * Utility functions for handling product videos
 */

export interface VideoInfo {
  type: 'youtube' | 'direct';
  url: string;
  youtubeId?: string;
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Parse video URL and return video info
 */
export function parseVideoUrl(url: string): VideoInfo | null {
  if (!url) return null;

  const youtubeId = getYouTubeVideoId(url);

  if (youtubeId) {
    return {
      type: 'youtube',
      url: url,
      youtubeId: youtubeId,
    };
  }

  // Assume it's a direct video URL
  return {
    type: 'direct',
    url: url,
  };
}

/**
 * Get YouTube thumbnail URL
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}

/**
 * Get YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
