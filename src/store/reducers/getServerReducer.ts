import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getServerList } from '../../services/snackchat-api/getServerList';

const initialState = {
  serverList: [],
  selectedServer: -1,
  status: 'Default',
};

interface getServerResponse {
  chatRoom: Array<any>;
  id: number;
  is_open: boolean;
  server_name: string;
  server_profile: string;
  user: Array<any>;
}

const asyncGetServerList = createAsyncThunk(
  'getServerReducer/asyncGetServerList',
  async (token: string) => {
    const resp = await getServerList({ token });
    return resp;
  },
);

const getServerListSlice = createSlice({
  name: 'getServerList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetServerList.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(asyncGetServerList.fulfilled, (state, action) => {
      state.serverList = action.payload;
      state.status = 'Complete';
      if (state.serverList.length > 0) {
        const firstServer: getServerResponse = state.serverList[0];
        state.selectedServer = firstServer.id;
      }
    });
    builder.addCase(asyncGetServerList.rejected, (state) => {
      state.status = 'Fail';
    });
  },
});

export default getServerListSlice;
export { asyncGetServerList };
