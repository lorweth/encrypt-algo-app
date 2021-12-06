import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import cipherFormReducer from './reducers/cipherFormReducer';
import outputPanelReducer from './reducers/outputPanelReducer';
import terminalReducer from './reducers/terminalReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
