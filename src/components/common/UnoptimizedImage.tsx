'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UnoptimizedImageProps } from '@/types/components';

export const UnoptimizedImage: React.FC<UnoptimizedImageProps> = ({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  priority = false,
  quality = 95,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to a placeholder image
      setImgSrc('https://via.placeholder.com/400x400/cccccc/666666?text=No+Image');
    }
  };

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    quality,
    priority,
    unoptimized: true, // Force unoptimized for external images
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    onError: handleError,
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 400}
      height={height || 400}
    />
  );
};
