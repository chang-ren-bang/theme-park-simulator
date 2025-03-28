import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  message: string;
  isVisible: boolean;
}

const initialState: DialogState = {
  message: '',
  isVisible: false,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.isVisible = action.payload.length > 0;
    },
    hideDialog: (state) => {
      state.isVisible = false;
    },
  },
});

export const { setMessage, hideDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
