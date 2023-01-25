import { configureStore } from '@reduxjs/toolkit';
import getTokenSlice from './reducers/getTokenReducer';

const store = configureStore({
  reducer: {
    getToken: getTokenSlice.reducer,
  },
});

export default store;
//
// export type RootStateType = ReturnType<typeof store.getState>;
//
// export type DispatchType = typeof store.dispatch;
