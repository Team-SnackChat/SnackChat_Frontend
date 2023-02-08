import { configureStore } from '@reduxjs/toolkit';
import getTokenSlice from './reducers/getTokenReducer';
import getServerListSlice from './reducers/getServerReducer';
import updateChatRoomSlice from './reducers/updateChatRoomReducer';

const store = configureStore({
  reducer: {
    getToken: getTokenSlice.reducer,
    getServerList: getServerListSlice.reducer,
    updateChatRoom: updateChatRoomSlice.reducer,
  },
});

export default store;
//
export type RootStateType = ReturnType<typeof store.getState>;
//
// export type DispatchType = typeof store.dispatch;
