import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@/types/profile';
import { fetchProfiles } from '@/utils/fetcher';

interface ProfilesState {
  profiles: Profile[];
  currentIndex: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfilesState = {
  profiles: [],
  currentIndex: 0,
  status: 'idle',
  error: null,
};

export const fetchProfilesAsync = createAsyncThunk(
  'profiles/fetchProfiles',
  async () => {
    const profiles = await fetchProfiles();
    return profiles;
  }
);

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    nextProfile: (state) => {
      state.currentIndex += 1;
    },
    resetProfiles: (state) => {
      state.profiles = [];
      state.currentIndex = 0;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfilesAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfilesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
        state.currentIndex = 0;
      })
      .addCase(fetchProfilesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch profiles';
      });
  },
});

export const { setCurrentIndex, nextProfile, resetProfiles } = profilesSlice.actions;
export default profilesSlice.reducer;
