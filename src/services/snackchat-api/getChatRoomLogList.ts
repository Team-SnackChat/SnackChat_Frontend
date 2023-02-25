import axios from 'axios';
import { SNACKCHAT_API_URL } from './constants';

export interface ChatLogResponseType {
  message: string;
  sender: string;
  chatroom: number;
  images: string;
  is_read: boolean;
  cur_time: string;
  date: string;
  email: string;
  profile_image: string;
  created_at: string;
  id: number;
}

interface GetChatRoomLogListProps {
  token: string;
  chatRoomId: number;
}

export const getChatRoomLogList = async (props: GetChatRoomLogListProps) => {
  try {
    if (SNACKCHAT_API_URL) {
      const response = await axios.get(
        `${SNACKCHAT_API_URL}/chats/chatlogs/${props.chatRoomId}/`,
        {
          headers: { Authorization: `Bearer ${props.token}` },
          withCredentials: true,
        },
      );
      return response.data.chatlog;
    }
  } catch (e) {
    console.error(e);
    throw new Error('Error occurred while get ChatRoomLog');
  }
  return { id: -1, chaglog: [] };
};
