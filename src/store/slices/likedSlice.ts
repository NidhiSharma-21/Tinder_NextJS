import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@/types/profile';
import { saveLikedProfiles, loadLikedProfiles } from '@/utils/localStorage';

interface LikedState {
  liked: Profile[];
}

const initialState: LikedState = {
  liked: loadLikedProfiles(),
};

const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    likeProfile: (state, action: PayloadAction<Profile>) => {
      const profile = action.payload;
      const isAlreadyLiked = state.liked.some(p => p.id === profile.id);
      
      if (!isAlreadyLiked) {
        state.liked.push(profile);
        saveLikedProfiles(state.liked);
      }
    },
    unlikeProfile: (state, action: PayloadAction<string>) => {
      const profileId = action.payload;
      state.liked = state.liked.filter(profile => profile.id !== profileId);
      saveLikedProfiles(state.liked);
    },
    clearLiked: (state) => {
      state.liked = [];
      saveLikedProfiles(state.liked);
    },
    loadLikedFromStorage: (state) => {
      state.liked = loadLikedProfiles();
    },
  },
});

export const { likeProfile, unlikeProfile, clearLiked, loadLikedFromStorage } = likedSlice.actions;
export default likedSlice.reducer;
