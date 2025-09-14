// Component Props Interfaces
import { Profile } from './profile';

export interface ProfileCardProps {
  profile: Profile;
  onLike: (profile: Profile) => void;
  onSkip: (profile: Profile) => void;
  isTop: boolean;
  zIndex: number;
}

export interface ProfileModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (profile: Profile) => void;
}

export interface ProfileSwipeStackProps {
  profiles: Profile[];
  currentIndex: number;
  onLike: (profile: Profile) => void;
  onSkip: (profile: Profile) => void;
}

export interface LikedUserCardProps {
  profile: Profile;
  onRemove: (profileId: string) => void;
}

export interface LikedUsersListProps {
  likedProfiles: Profile[];
  onRemoveProfile: (profileId: string) => void;
  onClearAll: () => void;
}

export interface BottomBarProps {
  canUndo: boolean;
  onUndo: () => void;
  onLike: () => void;
  onSkip: () => void;
  onViewProfile: () => void;
  hasCurrentProfile: boolean;
}

export interface ClientBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export interface ClientLikedBadgeProps {
  count: number;
  className?: string;
}

export interface UndoButtonProps {
  canUndo: boolean;
  onUndo: () => void;
}

export interface ProvidersProps {
  children: React.ReactNode;
}
