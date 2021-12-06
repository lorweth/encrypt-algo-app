import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: { plaintext: '', k: '' } };

const cipherFormSlice = createSlice({
  name: 'cipherForm',
  initialState: initialState,
  reducers: {
    setCipherData: (state, action) => {
      state.data = action.payload;
    },
    clearImmediate: (state, action) => {
      state.data = { plaintext: '', k: '' };
    },
  },
});

export const { setCipherData, clearImmediate } = cipherFormSlice.actions;
export default cipherFormSlice.reducer;
