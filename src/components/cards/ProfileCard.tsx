'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { Profile } from '@/types/profile';
import { ProfileCardProps } from '@/types/components';
import { SWIPE_THRESHOLD, ANIMATION_DURATION } from '@/constants/app';
import { Card } from '@/components/ui/card';
import { ClientBadge } from '@/components/common/ClientBadge';
import { Heart, X, MapPin, Star } from 'lucide-react';

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onSkip,
  isTop,
  zIndex,
}) => {
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);


  const handleDrag = (_event: unknown, info: PanInfo) => {
    const { offset } = info;
    setIsDragging(true);
    if (Math.abs(offset.x) > 50) {
      setDragDirection(offset.x > 0 ? 'right' : 'left');
    } else {
      setDragDirection(null);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    setIsDragging(false);
    const { offset, velocity } = info;
    
    if (Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > 500) {
      if (offset.x > 0) {
        onLike(profile);
      } else {
        onSkip(profile);
      }
    }
    
    setDragDirection(null);
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: isTop ? 1 : 0.95, 
      opacity: isTop ? 1 : 0.8,
      y: isTop ? 0 : 10,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -300 : 300,
      rotate: direction === 'left' ? -30 : 30,
      opacity: 0,
      transition: { duration: ANIMATION_DURATION }
    })
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ zIndex }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
    >
      <Card className="relative w-full h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
        {/* Profile Image - Full Height */}
        <div className="relative h-full w-full">
          <Image
            src={profile.picture}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isTop}
            quality={95}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Drag Overlay */}
          {dragDirection && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={`p-6 rounded-full shadow-2xl ${
                dragDirection === 'right' 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-red-400 to-rose-500 text-white'
              }`}>
                {dragDirection === 'right' ? (
                  <Heart className="w-12 h-12" />
                ) : (
                  <X className="w-12 h-12" />
                )}
              </div>
            </motion.div>
          )}

          {/* Profile Info - Only show when not dragging */}
          {!isDragging && (
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-0 mb-2">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold truncate">{profile.name}</h2>
                    <ClientBadge className="bg-white/20 text-white border-white/30 text-xs flex-shrink-0">
                      {profile.age}
                    </ClientBadge>
                  </div>
                  {profile.location && (
                    <div className="flex items-center gap-1 text-xs opacity-90">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{profile.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {profile.matchPercentage && (
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-300 flex-shrink-0" />
                      <span className="text-xs font-semibold">{profile.matchPercentage}%</span>
                    </div>
                  )}
                </div>
              </div>
              
              {profile.bio && (
                <p className="text-xs opacity-90 line-clamp-2 leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
