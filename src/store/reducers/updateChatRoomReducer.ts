import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatRoomId: -1,
  chatRoomName: '',
};

const updateChatRoomSlice = createSlice({
  name: 'updateChatRoom',
  initialState,
  reducers: {
    selectChatRoom: (state, action) => {
      state.chatRoomId = action.payload.chatRoomId;
      state.chatRoomName = action.payload.chatRoomName;
    },
  },
});

export default updateChatRoomSlice;
export const { selectChatRoom } = updateChatRoomSlice.actions;
