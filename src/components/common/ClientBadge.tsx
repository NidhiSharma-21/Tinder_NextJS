'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';

interface ClientBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const ClientBadge: React.FC<ClientBadgeProps> = ({ children, className }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Badge className={className}>
      {children}
    </Badge>
  );
};
