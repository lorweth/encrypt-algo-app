import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Log } from '../models/log';

type StateType = {
  logs: Log[];
  loading: boolean;
};

const initialState: StateType = {
  logs: [],
  loading: false,
};

const promiseAddLog = (log: Log): Promise<Log> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(log);
    }, 100);
  });
};

export const addLog = createAsyncThunk('logger/addLog', async (log: Log) => {
  const res = await promiseAddLog(log);
  return res;
});

const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(addLog.fulfilled, (state, action) => {
      state.logs.push(action.payload);
    });
  },
});

export const { reset } = loggerSlice.actions;

export default loggerSlice.reducer;
