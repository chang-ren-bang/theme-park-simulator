import { configureStore } from '@reduxjs/toolkit';
import visitorReducer from './visitorSlice';
import visitorConfigReducer from './visitorConfigSlice';

export const store = configureStore({
  reducer: {
    visitors: visitorReducer,
    visitorConfig: visitorConfigReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
