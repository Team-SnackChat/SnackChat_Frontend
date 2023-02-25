import axios from 'axios';
import { SNACKCHAT_API_URL } from './constants';

interface GetChatRoomListProps {
  token: string;
  serverId: number;
}

export interface GetChatRoomListResponseType {
  id: number;
  chatroom_name: string;
}

export const getChatRoomList = async (props: GetChatRoomListProps) => {
  try {
    if (SNACKCHAT_API_URL) {
      const response = await axios.get(
        `${SNACKCHAT_API_URL}/chats/servers/${props.serverId}/`,
        {
          headers: { Authorization: `Bearer ${props.token}` },
          withCredentials: true,
        },
      );
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw new Error('Error occurred while get Server List');
  }
  return [];
};
