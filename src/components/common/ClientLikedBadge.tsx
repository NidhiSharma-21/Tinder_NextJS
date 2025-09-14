'use client';

import React, { useState, useEffect } from 'react';
import { ClientLikedBadgeProps } from '@/types/components';
import { ClientBadge } from './ClientBadge';

export const ClientLikedBadge: React.FC<ClientLikedBadgeProps> = ({ count, className }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Don't render anything on server to avoid hydration mismatch
    return null;
  }

  if (count === 0) {
    return null;
  }

  return (
    <ClientBadge className={className}>
      {count}
    </ClientBadge>
  );
};
