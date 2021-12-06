import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: 'hacking nasa ... 0%<br/>hacking nasa ... 25%<br/>hacking nasa ... 76%<br>hacking nasa ... 100%<br>hacked',
};

const terminalSlice = createSlice({
  name: 'terminal',
  initialState: initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
    clearContent: state => {
      state.content = '';
    },
  },
});

export const { setContent, clearContent } = terminalSlice.actions;
export default terminalSlice.reducer;
