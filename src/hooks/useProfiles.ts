import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { fetchProfilesAsync, nextProfile, setCurrentIndex } from '@/store/slices/profilesSlice';
import { likeProfile, unlikeProfile } from '@/store/slices/likedSlice';
import { pushHistory, undoLastSwipe } from '@/store/slices/swipeHistorySlice';
import { Profile } from '@/types/profile';
import { toast } from 'sonner';

export const useProfiles = () => {
  const dispatch = useAppDispatch();
  const { profiles, currentIndex, status, error } = useAppSelector((state) => state.profiles);
  const { liked } = useAppSelector((state) => state.liked);
  const { history } = useAppSelector((state) => state.swipeHistory);

  useEffect(() => {
    if (profiles.length === 0 && status === 'idle') {
      dispatch(fetchProfilesAsync());
    }
  }, [dispatch, profiles.length, status]);

  const currentProfile = profiles[currentIndex];
  const hasMoreProfiles = currentIndex < profiles.length - 1;
  const isLastProfile = currentIndex === profiles.length - 1;

  const handleLike = (profile: Profile) => {
    dispatch(likeProfile(profile));
    dispatch(pushHistory({ profileId: profile.id, action: 'like', timestamp: Date.now() }));
    dispatch(nextProfile());
    toast.success(`You liked ${profile.name}! 💕`, {
      description: 'Check your matches to see them again',
    });
  };

  const handleSkip = (profile: Profile) => {
    dispatch(pushHistory({ profileId: profile.id, action: 'skip', timestamp: Date.now() }));
    dispatch(nextProfile());
    toast.info(`Skipped ${profile.name}`, {
      description: 'You can undo this action if you change your mind',
    });
  };

  const handleUnlike = (profileId: string) => {
    const profile = liked.find(p => p.id === profileId);
    dispatch(unlikeProfile(profileId));
    if (profile) {
      toast.info(`Removed ${profile.name} from matches`, {
        description: 'They won\'t appear in your matches anymore',
      });
    }
  };

  const refetchProfiles = () => {
    dispatch(fetchProfilesAsync());
  };

  const handleUndo = () => {
    if (history.length > 0 && currentIndex > 0) {
      const lastAction = history[history.length - 1];
      dispatch(undoLastSwipe());
      dispatch(setCurrentIndex(currentIndex - 1));
      
      // If the last action was a like, remove from liked list
      if (lastAction.action === 'like') {
        dispatch(unlikeProfile(lastAction.profileId));
      }
      
      toast.success('Undid last action!', {
        description: `Reversed ${lastAction.action} for the profile`,
      });
    } else {
      toast.info('Nothing to undo', {
        description: 'No previous actions to reverse',
      });
    }
  };

  return {
    profiles,
    currentProfile,
    currentIndex,
    status,
    error,
    liked,
    hasMoreProfiles,
    isLastProfile,
    canUndo: history.length > 0,
    handleLike,
    handleSkip,
    handleUnlike,
    handleUndo,
    refetchProfiles,
  };
};
