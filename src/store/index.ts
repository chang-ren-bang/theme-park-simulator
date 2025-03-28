import { configureStore } from '@reduxjs/toolkit';
import visitorReducer from './visitorSlice';

export const store = configureStore({
  reducer: {
    visitors: visitorReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
