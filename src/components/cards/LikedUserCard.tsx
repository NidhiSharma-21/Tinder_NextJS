'use client';

import React, { useState } from 'react';
import { Profile } from '@/types/profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ClientBadge } from '@/components/common/ClientBadge';
import { ProfileModal } from './ProfileModal';
import { Trash2, Eye, MapPin, Star, Briefcase, AlertTriangle } from 'lucide-react';
import { getMatchColor } from '@/utils/match';

interface LikedUserCardProps {
  profile: Profile;
  onRemove: (profileId: string) => void;
}

export const LikedUserCard: React.FC<LikedUserCardProps> = ({
  profile,
  onRemove,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleRemoveClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmRemove = () => {
    onRemove(profile.id);
    setShowDeleteModal(false);
  };

  const handleCancelRemove = () => {
    setShowDeleteModal(false);
  };

  const handleViewProfile = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-r from-white to-pink-50/30">
        <CardContent className="p-3 sm:p-4">
          {/* Mobile Layout - Stacked */}
          <div className="block sm:hidden">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="h-12 w-12 border-2 border-pink-200 flex-shrink-0">
                <AvatarImage src={profile.picture} alt={profile.name} />
                <AvatarFallback className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-semibold text-xs">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900 text-sm break-words">
                    {profile.name}
                  </h3>
                  <ClientBadge className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-pink-200 text-xs flex-shrink-0">
                    {profile.age}
                  </ClientBadge>
                  {profile.matchPercentage && (
                    <div className={`flex items-center gap-1 ${getMatchColor(profile.matchPercentage)} flex-shrink-0`}>
                      <Star className="w-3 h-3" />
                      <span className="text-xs font-semibold">{profile.matchPercentage}%</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  {profile.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{profile.location}</span>
                    </div>
                  )}
                  {profile.occupation && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Briefcase className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{profile.occupation}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action buttons row */}
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewProfile}
                className="h-8 w-8 p-0 border-pink-200 hover:border-pink-300 hover:bg-pink-50"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveClick}
                className="h-8 w-8 p-0 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-pink-200 flex-shrink-0">
              <AvatarImage src={profile.picture} alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-semibold text-sm">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900 text-base whitespace-nowrap overflow-hidden text-ellipsis">
                  {profile.name}
                </h3>
                <ClientBadge className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-pink-200 text-xs">
                  {profile.age}
                </ClientBadge>
                {profile.matchPercentage && (
                  <div className={`flex items-center gap-1 ${getMatchColor(profile.matchPercentage)}`}>
                    <Star className="w-3 h-3" />
                    <span className="text-xs font-semibold">{profile.matchPercentage}%</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                {profile.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{profile.location}</span>
                  </div>
                )}
                {profile.occupation && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Briefcase className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{profile.occupation}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewProfile}
                className="h-8 w-8 p-0 border-pink-200 hover:border-pink-300 hover:bg-pink-50"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveClick}
                className="h-8 w-8 p-0 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileModal
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLike={() => {}} // Already liked, no action needed
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Remove Profile
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to remove <strong>{profile.name}</strong> from your liked profiles? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleCancelRemove}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmRemove}
              className="w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};