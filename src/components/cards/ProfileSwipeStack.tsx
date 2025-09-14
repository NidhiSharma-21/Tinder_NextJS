'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Profile } from '@/types/profile';
import { ProfileCard } from './ProfileCard';
import { CARD_STACK_SIZE } from '@/constants/app';

interface ProfileSwipeStackProps {
  profiles: Profile[];
  currentIndex: number;
  onLike: (profile: Profile) => void;
  onSkip: (profile: Profile) => void;
}

export const ProfileSwipeStack: React.FC<ProfileSwipeStackProps> = ({
  profiles,
  currentIndex,
  onLike,
  onSkip,
}) => {
  const visibleProfiles = profiles.slice(currentIndex, currentIndex + CARD_STACK_SIZE);

  return (
    <div className="relative w-full max-w-sm mx-auto h-[500px]">
      <AnimatePresence>
        {visibleProfiles.map((profile, index) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onLike={onLike}
            onSkip={onSkip}
            isTop={index === 0}
            zIndex={CARD_STACK_SIZE - index}
          />
        ))}
      </AnimatePresence>
      
      {/* Empty State */}
      {visibleProfiles.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No more profiles
            </h3>
            <p className="text-gray-500">
              Check back later for new matches!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
