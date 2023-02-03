import { configureStore } from '@reduxjs/toolkit';
import getTokenSlice from './reducers/getTokenReducer';
import getServerListSlice from './reducers/getServerReducer';

const store = configureStore({
  reducer: {
    getToken: getTokenSlice.reducer,
    getServerList: getServerListSlice.reducer,
  },
});

export default store;
//
export type RootStateType = ReturnType<typeof store.getState>;
//
// export type DispatchType = typeof store.dispatch;
