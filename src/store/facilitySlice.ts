import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Facility } from '../components/game/Facility';
import { FacilityConfig, Position } from '../components/game/types/FacilityTypes';

interface FacilityState {
  facilities: { [key: string]: Facility };
  mapWidth: number;
  mapHeight: number;
}

const initialState: FacilityState = {
  facilities: {},
  mapWidth: 50,
  mapHeight: 50
};

const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {
    buildFacility: (state, action: PayloadAction<Omit<FacilityConfig, 'id'>>) => {
      const id = `facility-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const config: FacilityConfig = {
        ...action.payload,
        id
      };
      state.facilities[id] = new Facility(config);
    },
    moveFacility: (state, action: PayloadAction<{ facilityId: string; position: Position }>) => {
      const { facilityId, position } = action.payload;
      const oldFacility = state.facilities[facilityId];
      if (oldFacility) {
        const config: FacilityConfig = {
          id: facilityId,
          name: oldFacility.getName(),
          position,
          capacity: oldFacility.getCapacity(),
          minDuration: 1,
          maxDuration: 5,
          maxQueueLength: 50
        };
        state.facilities[facilityId] = new Facility(config);
      }
    },
    updateCapacity: (state, action: PayloadAction<{ facilityId: string; capacity: number }>) => {
      const { facilityId, capacity } = action.payload;
      const oldFacility = state.facilities[facilityId];
      if (oldFacility) {
        const config: FacilityConfig = {
          id: facilityId,
          name: oldFacility.getName(),
          position: oldFacility.getPosition(),
          capacity,
          minDuration: 1,
          maxDuration: 5,
          maxQueueLength: 50
        };
        state.facilities[facilityId] = new Facility(config);
      }
    },
    removeFacility: (state, action: PayloadAction<string>) => {
      delete state.facilities[action.payload];
    },
  },
});

export const {
  buildFacility,
  moveFacility,
  updateCapacity,
  removeFacility,
} = facilitySlice.actions;

export default facilitySlice.reducer;
