import axios from 'axios';

const SNACKCHAT_API_URL = process.env.REACT_APP_SNACKCHAT_API_URL;
const SNACKCHAT_TEST_URL = process.env.REACT_APP_COOKIE_TEST_URL;

interface GetServerListProps {
  token: string;
}

export const getServerList = async (props: GetServerListProps) => {
  try {
    if (SNACKCHAT_API_URL) {
      const response = await axios.get(`${SNACKCHAT_API_URL}/chats/servers/`, {
        headers: { Authorization: `Bearer ${props.token}` },
        withCredentials: true,
      });
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw new Error('Error occurred while get Server List');
  }
  return '';
};
