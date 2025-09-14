'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { UndoButton } from '@/components/common/UndoButton';
import { Heart, X, Eye } from 'lucide-react';

interface BottomBarProps {
  canUndo: boolean;
  onUndo: () => void;
  onLike: () => void;
  onSkip: () => void;
  onViewProfile: () => void;
  hasCurrentProfile: boolean;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  canUndo,
  onUndo,
  onLike,
  onSkip,
  onViewProfile,
  hasCurrentProfile,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-20" style={{ touchAction: 'none' }}>
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Action Buttons */}
          <div className="flex items-center gap-3" style={{ touchAction: 'manipulation' }}>
            {/* Skip Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={onSkip}
              disabled={!hasCurrentProfile}
              className="h-12 w-12 rounded-full border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 shadow-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>

            {/* Undo Button */}
            <UndoButton canUndo={canUndo} onUndo={onUndo} />

            {/* Like Button */}
            <Button
              size="lg"
              onClick={onLike}
              disabled={!hasCurrentProfile}
              className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Heart className="w-5 h-5 text-white" />
            </Button>
          </div>

          {/* Right Side - View Profile Button */}
          <div className="flex items-center" style={{ touchAction: 'manipulation' }}>
            <Button
              variant="outline"
              size="lg"
              onClick={onViewProfile}
              disabled={!hasCurrentProfile}
              className="h-12 px-6 rounded-full border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 shadow-lg flex items-center gap-2"
            >
              <Eye className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">View Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
