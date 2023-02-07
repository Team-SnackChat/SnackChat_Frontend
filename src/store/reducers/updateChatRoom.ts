import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatRoomId: -1,
};

const updateChatRoomSlice = createSlice({
  name: 'updateChatRoom',
  initialState,
  reducers: {
    selectChatRoom: (state, action) => {
      state.chatRoomId = action.payload;
    },
  },
});

export default updateChatRoomSlice;
export const { selectChatRoom } = updateChatRoomSlice.actions;
