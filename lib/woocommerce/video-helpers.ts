/**
 * Helper functions to extract video information from WooCommerce product meta_data
 */

import { WooProduct } from "@/types/woocommerce";

export interface ProductVideoInfo {
  source: 'local' | 'youtube' | 'vimeo' | null;
  url: string | null;
  posterImage: string | null;
}

/**
 * Extract video information from WooCommerce product meta_data
 * Supports WooCommerce Featured Video plugin format
 */
export function getProductVideo(product: WooProduct): ProductVideoInfo {
  if (!product.meta_data || product.meta_data.length === 0) {
    return {
      source: null,
      url: null,
      posterImage: null,
    };
  }

  // Find the video source
  const sourceData = product.meta_data.find((meta) => meta.key === 'wcfv_source');
  const source = sourceData?.value as 'local' | 'youtube' | 'vimeo' | null;

  if (!source) {
    return {
      source: null,
      url: null,
      posterImage: null,
    };
  }

  let videoUrl: string | null = null;
  let posterImage: string | null = null;

  // Extract video URL based on source
  switch (source) {
    case 'local':
      const localVideoData = product.meta_data.find((meta) => meta.key === 'wcfv_local_video');
      videoUrl = localVideoData?.value || null;
      const posterData = product.meta_data.find((meta) => meta.key === 'wcfv_poster_image');
      posterImage = posterData?.value || null;
      break;

    case 'youtube':
      const youtubeVideoData = product.meta_data.find((meta) => meta.key === 'wcfv_youtube_video');
      videoUrl = youtubeVideoData?.value || null;
      const youtubeImageData = product.meta_data.find((meta) => meta.key === 'wcfv_youtube_image');
      posterImage = youtubeImageData?.value || null;
      break;

    case 'vimeo':
      const vimeoVideoData = product.meta_data.find((meta) => meta.key === 'wcfv_vimeo_video');
      videoUrl = vimeoVideoData?.value || null;
      const vimeoImageData = product.meta_data.find((meta) => meta.key === 'wcfv_vimeo_image');
      posterImage = vimeoImageData?.value || null;
      break;
  }

  // Only return video info if we have a valid URL
  if (!videoUrl || videoUrl === '') {
    return {
      source: null,
      url: null,
      posterImage: null,
    };
  }

  return {
    source,
    url: videoUrl,
    posterImage: posterImage || null,
  };
}

/**
 * Check if a product has a video
 */
export function hasProductVideo(product: WooProduct): boolean {
  const videoInfo = getProductVideo(product);
  return videoInfo.url !== null && videoInfo.url !== '';
}
