'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { LikedUsersList } from '@/components/cards/LikedUsersList';
import { LikedPageSkeleton } from '@/components/common/LikedPageSkeleton';
import { unlikeProfile, clearLiked, loadLikedFromStorage } from '@/store/slices/likedSlice';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';

export default function LikedPage() {
  const dispatch = useAppDispatch();
  const { liked } = useAppSelector((state) => state.liked);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    dispatch(loadLikedFromStorage());
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleRemoveProfile = (profileId: string) => {
    dispatch(unlikeProfile(profileId));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all liked profiles?')) {
      dispatch(clearLiked());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header - Mobile Responsive */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Left Side - Back Button + Title */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-pink-50 flex-shrink-0">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent truncate">
                  Your Matches
                </h1>
              </div>
            </div>
            
            {/* Right Side - Back to Swiping Button */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-xs sm:text-sm"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Swiping</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Mobile Responsive */}
      <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-8">
        {isLoading ? (
          <LikedPageSkeleton />
        ) : (
          <LikedUsersList
            likedProfiles={liked}
            onRemoveProfile={handleRemoveProfile}
            onClearAll={handleClearAll}
          />
        )}
      </div>
    </div>
  );
}
