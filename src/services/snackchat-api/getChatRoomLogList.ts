import axios from 'axios';

const SNACKCHAT_API_URL = process.env.REACT_APP_SNACKCHAT_API_URL;
const SNACKCHAT_TEST_URL = process.env.REACT_APP_COOKIE_TEST_URL;

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
