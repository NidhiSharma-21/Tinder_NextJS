'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProfiles } from '@/hooks/useProfiles';
import { ProfileSwipeStack } from '@/components/cards/ProfileSwipeStack';
import { ProfileModal } from '@/components/cards/ProfileModal';
import { BottomBar } from '@/components/navigation/BottomBar';
import { Button } from '@/components/ui/button';
import { ClientLikedBadge } from '@/components/common/ClientLikedBadge';
import { useAppDispatch } from '@/hooks/useRedux';
import { loadLikedFromStorage } from '@/store/slices/likedSlice';
import { Heart as HeartIcon, Sparkles, X } from 'lucide-react';
import { Profile } from '@/types/profile';

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  const {
    profiles,
    currentProfile,
    currentIndex,
    status,
    error,
    liked,
    isLastProfile,
    canUndo,
    handleLike,
    handleSkip,
    handleUndo,
    refetchProfiles,
  } = useProfiles();

  // Preload liked data for instant navigation
  useEffect(() => {
    dispatch(loadLikedFromStorage());
  }, [dispatch]);


  const handleViewProfile = () => {
    if (currentProfile) {
      setSelectedProfile(currentProfile);
      setIsModalOpen(true);
    }
  };

  const handleModalLike = (profile: Profile) => {
    handleLike(profile);
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Finding amazing people...</h3>
            <p className="text-gray-600">Loading profiles just for you</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={refetchProfiles} className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
            <Sparkles className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <HeartIcon className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                SwipeApp
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/liked">
                <Button variant="ghost" size="sm" className="relative h-10 w-10 p-0">
                  <HeartIcon className="w-5 h-5" />
                  <ClientLikedBadge 
                    count={liked.length}
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Swipe Card Area */}
      <div className="max-w-md mx-auto px-4 py-6 pb-40">
        <div className="relative h-[500px] mb-12" style={{ touchAction: 'pan-y pinch-zoom' }}>
          <ProfileSwipeStack 
            profiles={profiles} 
            currentIndex={currentIndex} 
            onLike={handleLike} 
            onSkip={handleSkip} 
          />
        </div>


        {/* Empty State */}
        {isLastProfile && (
          <div className="text-center mt-8 mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              That&apos;s everyone for now!
            </h3>
            <p className="text-gray-600 mb-6">
              You&apos;ve seen all available profiles. Check your matches or refresh for more amazing people.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/liked">
                <Button variant="outline" className="border-pink-200 hover:border-pink-300 hover:bg-pink-50">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  View Matches ({liked.length})
                </Button>
              </Link>
              <Button onClick={refetchProfiles} className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
                <Sparkles className="w-4 h-4 mr-2" />
                Find More
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <BottomBar
        canUndo={canUndo}
        onUndo={handleUndo}
        onLike={() => currentProfile && handleLike(currentProfile)}
        onSkip={() => currentProfile && handleSkip(currentProfile)}
        onViewProfile={handleViewProfile}
        hasCurrentProfile={!!currentProfile}
      />

      {/* Profile Modal */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProfile(null);
        }}
        onLike={handleModalLike}
      />
    </div>
  );
}
