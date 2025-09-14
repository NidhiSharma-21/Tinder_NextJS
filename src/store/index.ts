import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './slices/profilesSlice';
import likedReducer from './slices/likedSlice';
import swipeHistoryReducer from './slices/swipeHistorySlice';

export const store = configureStore({
  reducer: {
    profiles: profilesReducer,
    liked: likedReducer,
    swipeHistory: swipeHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
