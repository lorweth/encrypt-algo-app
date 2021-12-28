import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CipherType } from '../models/cipher';

const initialData = {
  content: 'WOLFASLEEPAMIDSTTHETREE',
  k: 9,
  algorithm: 'caesar',
  isDecrypt: false,
} as CipherType;

const initialState = {
  data: initialData,
  output: '',
  log: [''],
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    addLog: (state, action) => {
      // state.log = initialState.log;
      state.log.push(action.payload);
    },
    clearLog: state => {
      state.log = [''];
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

export const { addLog, clearLog, setOutput, setData, resetAll } = appSlice.actions;
export default appSlice.reducer;
