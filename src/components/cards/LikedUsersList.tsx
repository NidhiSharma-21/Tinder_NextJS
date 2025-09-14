'use client';

import React, { useState } from 'react';
import { Profile } from '@/types/profile';
import { LikedUsersListProps } from '@/types/components';
import { LikedUserCard } from './LikedUserCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Trash2, AlertTriangle } from 'lucide-react';

export const LikedUsersList: React.FC<LikedUsersListProps> = ({
  likedProfiles,
  onRemoveProfile,
  onClearAll,
}) => {
  const [showClearAllModal, setShowClearAllModal] = useState(false);

  const handleClearAllClick = () => {
    setShowClearAllModal(true);
  };

  const handleConfirmClearAll = () => {
    onClearAll();
    setShowClearAllModal(false);
  };

  const handleCancelClearAll = () => {
    setShowClearAllModal(false);
  };
  if (likedProfiles.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-pink-50 via-white to-purple-50 border-0 shadow-lg">
        <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            No matches yet
          </h3>
          <p className="text-gray-600 max-w-sm leading-relaxed text-sm sm:text-base">
            Start swiping to find amazing people! Your liked profiles will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Mobile Responsive */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-0 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Your Matches ({likedProfiles.length})
                </h2>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                People you&apos;ve liked and want to connect with
              </p>
            </div>
            
            {likedProfiles.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAllClick}
                className="flex items-center gap-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700 self-start sm:self-auto"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Liked Profiles Grid - Mobile Responsive */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {likedProfiles.map((profile) => (
          <LikedUserCard
            key={profile.id}
            profile={profile}
            onRemove={onRemoveProfile}
          />
        ))}
      </div>

      {/* Clear All Confirmation Modal */}
      <Dialog open={showClearAllModal} onOpenChange={setShowClearAllModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Clear All Matches
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to remove all {likedProfiles.length} liked profiles? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleCancelClearAll}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmClearAll}
              className="w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
