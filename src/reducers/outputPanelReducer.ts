import { createSlice } from '@reduxjs/toolkit';

const initialState = { content: 'This is result' };

const outputPanelSlice = createSlice({
  name: 'outputPanel',
  initialState: initialState,
  reducers: {
    setOutput: (state, action) => {
      state.content = action.payload;
    },
    clearOutput: (state, action) => {
      state.content = '';
    },
  },
});

export const { setOutput, clearOutput } = outputPanelSlice.actions;
export default outputPanelSlice.reducer;
