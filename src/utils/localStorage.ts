import { STORAGE_KEYS } from '@/constants/app';
import { Profile, SwipeAction } from '@/types/profile';

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const saveLikedProfiles = (profiles: Profile[]): void => {
  saveToLocalStorage(STORAGE_KEYS.LIKED_PROFILES, profiles);
};

export const loadLikedProfiles = (): Profile[] => {
  return loadFromLocalStorage(STORAGE_KEYS.LIKED_PROFILES, []);
};

export const saveSwipeHistory = (history: SwipeAction[]): void => {
  saveToLocalStorage(STORAGE_KEYS.SWIPE_HISTORY, history);
};

export const loadSwipeHistory = (): SwipeAction[] => {
  return loadFromLocalStorage(STORAGE_KEYS.SWIPE_HISTORY, []);
};
