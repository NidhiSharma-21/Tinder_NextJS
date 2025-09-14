'use client';

import React from 'react';
import Image from 'next/image';
import { Profile } from '@/types/profile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClientBadge } from '@/components/ClientBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, MapPin, Mail, Sparkles, Star, Briefcase, GraduationCap, Ruler, Globe, Languages, Users } from 'lucide-react';
import { getMatchMessage, getMatchColor } from '@/utils/match';

interface ProfileModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (profile: Profile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onLike,
}) => {
  if (!profile) return null;

  const handleLike = () => {
    onLike(profile);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full max-h-[95vh] overflow-hidden p-0 sm:max-h-[90vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>Profile Details</DialogTitle>
        </DialogHeader>
        
        {/* Profile Image - Smaller on mobile */}
        <div className="relative h-48 w-full sm:h-64">
          <Image
            src={profile.picture}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Profile Details - Scrollable */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(95vh-12rem)] sm:p-6 sm:space-y-6 sm:max-h-[calc(90vh-16rem)]">
          {/* Header - More compact on mobile */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{profile.name}</h2>
                <ClientBadge className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-pink-200">
                  {profile.age}
                </ClientBadge>
              </div>
              <Button 
                onClick={handleLike} 
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg"
              >
                <Heart className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Like</span>
              </Button>
            </div>
            
            {profile.matchPercentage && (
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`flex items-center gap-1 ${getMatchColor(profile.matchPercentage)}`}>
                  <Star className="w-4 h-4" />
                  <span className="font-semibold text-sm sm:text-base">{profile.matchPercentage}% Match</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  {getMatchMessage(profile.matchPercentage)}
                </span>
              </div>
            )}
          </div>

          {/* Quick Info Cards - More compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.location && (
              <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span className="font-medium text-sm truncate">{profile.location}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile.email && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="font-medium text-sm truncate">{profile.email}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile.occupation && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Briefcase className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="font-medium text-sm truncate">{profile.occupation}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile.education && (
              <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <GraduationCap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="font-medium text-sm truncate">{profile.education}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {profile.bio && (
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">About</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">{profile.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Additional Details - More compact */}
          <div className="grid grid-cols-2 gap-3">
            {profile.height && (
              <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Ruler className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Height</p>
                      <p className="font-medium text-sm">{profile.height}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile.religion && (
              <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Globe className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Religion</p>
                      <p className="font-medium text-sm">{profile.religion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Languages and Interests - More compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.languages && profile.languages.length > 0 && (
              <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Languages className="w-4 h-4 text-teal-500" />
                    <h3 className="font-semibold text-gray-900 text-sm">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {profile.languages.map((language, index) => (
                      <ClientBadge key={index} className="bg-teal-100 text-teal-700 border-teal-200 text-xs">
                        {language}
                      </ClientBadge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {profile.interests && profile.interests.length > 0 && (
              <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-rose-500" />
                    <h3 className="font-semibold text-gray-900 text-sm">Interests</h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {profile.interests.map((interest, index) => (
                      <ClientBadge key={index} className="bg-rose-100 text-rose-700 border-rose-200 text-xs">
                        {interest}
                      </ClientBadge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Match Compatibility - More compact */}
          {profile.matchPercentage && (
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">Compatibility</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Match Score</span>
                    <span className={`font-bold text-lg ${getMatchColor(profile.matchPercentage)}`}>
                      {profile.matchPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        profile.matchPercentage >= 90 ? 'bg-gradient-to-r from-red-400 to-pink-500' :
                        profile.matchPercentage >= 80 ? 'bg-gradient-to-r from-pink-400 to-purple-500' :
                        profile.matchPercentage >= 70 ? 'bg-gradient-to-r from-purple-400 to-blue-500' :
                        'bg-gradient-to-r from-blue-400 to-gray-500'
                      }`}
                      style={{ width: `${profile.matchPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {getMatchMessage(profile.matchPercentage)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bottom Action Buttons - More compact */}
          <div className="flex gap-3 pt-2 sticky bottom-0 bg-white/95 backdrop-blur-sm -mx-4 px-4 pb-4 sm:-mx-6 sm:px-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-200 hover:border-gray-300 text-sm"
            >
              Close
            </Button>
            <Button
              onClick={handleLike}
              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-sm"
            >
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
