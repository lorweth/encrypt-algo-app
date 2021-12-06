import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    plaintext: '',
    k: '',
  },
  output: '',
  log: '',
  error: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setLog: (state, action) => {
      state.log = action.payload;
    },
    addLog: (state, action) => {
      state.log += action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    resetAll: state => {
      state.data = initialState.data;
      state.log = initialState.log;
      state.output = initialState.output;
    },
  },
});

export const { setLog, addLog, setOutput, setData, resetAll } = appSlice.actions;
export default appSlice.reducer;
