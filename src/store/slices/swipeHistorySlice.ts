import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwipeAction } from '@/types/profile';
import { saveSwipeHistory, loadSwipeHistory } from '@/utils/localStorage';

interface SwipeHistoryState {
  history: SwipeAction[];
  lastAction: SwipeAction | null;
}

const initialState: SwipeHistoryState = {
  history: loadSwipeHistory(),
  lastAction: null,
};

const swipeHistorySlice = createSlice({
  name: 'swipeHistory',
  initialState,
  reducers: {
    pushHistory: (state, action: PayloadAction<SwipeAction>) => {
      state.history.push(action.payload);
      state.lastAction = action.payload;
      saveSwipeHistory(state.history);
    },
    undoLastSwipe: (state) => {
      if (state.history.length > 0) {
        state.lastAction = state.history.pop() || null;
        saveSwipeHistory(state.history);
      }
    },
    clearHistory: (state) => {
      state.history = [];
      saveSwipeHistory(state.history);
    },
    loadHistoryFromStorage: (state) => {
      state.history = loadSwipeHistory();
    },
  },
});

export const { pushHistory, undoLastSwipe, clearHistory, loadHistoryFromStorage } = swipeHistorySlice.actions;
export default swipeHistorySlice.reducer;
