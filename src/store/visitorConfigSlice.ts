import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface VisitorConfigState {
  satisfactionParams: {
    initialValue: number;
    decayRate: number;
    playBoost: number;
    criticalLevel: number;
    maxFailCount: number;
  };
  behaviorParams: {
    updateInterval: number;
    pathfindingRange: number;
    queueingTimeLimit: number;
  };
}

const initialState: VisitorConfigState = {
  satisfactionParams: {
    initialValue: 100,
    decayRate: 0.1,
    playBoost: 10,
    criticalLevel: 50,
    maxFailCount: 3
  },
  behaviorParams: {
    updateInterval: 1000,
    pathfindingRange: 100,
    queueingTimeLimit: 300
  }
};

export const visitorConfigSlice = createSlice({
  name: 'visitorConfig',
  initialState,
  reducers: {
    updateSatisfactionParams: (
      state,
      action: PayloadAction<Partial<VisitorConfigState['satisfactionParams']>>
    ) => {
      state.satisfactionParams = {
        ...state.satisfactionParams,
        ...action.payload
      };
    },
    updateBehaviorParams: (
      state,
      action: PayloadAction<Partial<VisitorConfigState['behaviorParams']>>
    ) => {
      state.behaviorParams = {
        ...state.behaviorParams,
        ...action.payload
      };
    },
    resetConfig: (state) => {
      state.satisfactionParams = initialState.satisfactionParams;
      state.behaviorParams = initialState.behaviorParams;
    }
  }
});

export const {
  updateSatisfactionParams,
  updateBehaviorParams,
  resetConfig
} = visitorConfigSlice.actions;

export const selectSatisfactionParams = (state: RootState) =>
  state.visitorConfig.satisfactionParams;
export const selectBehaviorParams = (state: RootState) =>
  state.visitorConfig.behaviorParams;

export default visitorConfigSlice.reducer;
