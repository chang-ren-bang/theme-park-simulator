import { configureStore } from '@reduxjs/toolkit';
import visitorReducer from './visitorSlice';
import visitorConfigReducer from './visitorConfigSlice';
import facilityReducer from './facilitySlice';

export const store = configureStore({
  reducer: {
    visitors: visitorReducer,
    visitorConfig: visitorConfigReducer,
    facilities: facilityReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
