import React from 'react';

export interface ParsedVideoSource {
  type: 'vimeo-id' | 'vimeo-url' | 'youtube' | 'direct-video' | 'iframe-embed';
  embedUrl?: string;
  directUrl?: string;
  rawIframe?: string;
}

export function parseVideoSource(source: string): ParsedVideoSource {
  if (!source || !source.trim()) {
    return {
      type: 'vimeo-id',
      embedUrl: 'https://player.vimeo.com/video/76979871?autoplay=1&title=0&byline=0&portrait=0',
    };
  }

  const trimmed = source.trim();

  // 1. Check for iframe embed code
  if (trimmed.toLowerCase().includes('<iframe')) {
    // Try to extract src attribute
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      return {
        type: 'iframe-embed',
        embedUrl: srcMatch[1],
        rawIframe: trimmed,
      };
    }
    return {
      type: 'iframe-embed',
      rawIframe: trimmed,
    };
  }

  // 2. Check for YouTube URLs
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = trimmed.match(youtubeRegex);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // 3. Check for Vimeo URLs or Vimeo player URLs
  const vimeoUrlRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i;
  const vimeoMatch = trimmed.match(vimeoUrlRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo-url',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`,
    };
  }

  // 4. Check for direct video links or blob / data URLs
  if (
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:video/') ||
    /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(trimmed) ||
    trimmed.includes('commondatastorage.googleapis.com')
  ) {
    return {
      type: 'direct-video',
      directUrl: trimmed,
    };
  }

  // 5. Check if numeric Vimeo ID (e.g. 76979871)
  if (/^\d+$/.test(trimmed)) {
    return {
      type: 'vimeo-id',
      embedUrl: `https://player.vimeo.com/video/${trimmed}?autoplay=1&title=0&byline=0&portrait=0`,
    };
  }

  // 6. Generic web URL (treat as embed if http)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return {
      type: 'iframe-embed',
      embedUrl: trimmed,
    };
  }

  // Default fallback to Vimeo player with the raw string
  return {
    type: 'vimeo-id',
    embedUrl: `https://player.vimeo.com/video/${trimmed}?autoplay=1&title=0&byline=0&portrait=0`,
  };
}

interface UniversalVideoPlayerProps {
  source: string;
  title: string;
  poster?: string;
  fallbackPreviewUrl?: string;
  className?: string;
}

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  source,
  title,
  poster,
  fallbackPreviewUrl,
  className = 'w-full h-full',
}) => {
  const parsed = parseVideoSource(source);

  if (parsed.type === 'direct-video' && parsed.directUrl) {
    return (
      <video
        src={parsed.directUrl}
        controls
        autoPlay
        playsInline
        className={`${className} object-contain bg-black`}
        poster={poster}
      >
        Your browser does not support HTML5 video playback.
      </video>
    );
  }

  if (parsed.rawIframe && !parsed.embedUrl) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-black overflow-hidden [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0`}
        dangerouslySetInnerHTML={{ __html: parsed.rawIframe }}
      />
    );
  }

  if (parsed.embedUrl) {
    return (
      <iframe
        src={parsed.embedUrl}
        title={title}
        className={`${className} border-0 bg-black`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
      />
    );
  }

  // Fallback to previewUrl video
  return (
    <video
      src={fallbackPreviewUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
      controls
      autoPlay
      playsInline
      className={`${className} object-contain bg-black`}
      poster={poster}
    >
      Your browser does not support video playback.
    </video>
  );
};
