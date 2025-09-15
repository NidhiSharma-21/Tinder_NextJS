'use client';

import React, { useState, useEffect } from 'react';
import { UndoButtonProps } from '@/types/components';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export const UndoButton: React.FC<UndoButtonProps> = ({ canUndo, onUndo }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="lg"
        disabled={true}
        className="h-12 w-12 rounded-full transition-all duration-200 shadow-lg border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed disabled:border-gray-100"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={onUndo}
      disabled={!canUndo}
      className="h-12 w-12 rounded-full transition-all duration-200 shadow-lg border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed disabled:border-gray-100"
    >
      <RotateCcw className="w-5 h-5" />
    </Button>
  );
};
