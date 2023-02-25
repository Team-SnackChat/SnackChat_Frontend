import axios from 'axios';
import { SNACKCHAT_API_URL } from './constants';

interface PostNewServerProps {
  token: string;
  serverName: string;
  serverProfile: any;
}

export const postNewServer = async (props: PostNewServerProps) => {
  try {
    let serverProfile;
    const reader = new FileReader();
    reader.readAsDataURL(props.serverProfile);
    reader.onloadend = () => {
      serverProfile = reader.result;
    };
    if (SNACKCHAT_API_URL) {
      const response = await axios.post(
        `${SNACKCHAT_API_URL}/chats/servers/create/`,
        {
          server_name: props.serverName,
          server_profile: serverProfile,
        },
        {
          headers: { Authorization: `Bearer ${props.token}` },
          withCredentials: true,
        },
      );
      console.log(response.data);
    }
  } catch (e) {
    console.error(e);
    throw new Error('Error occurred while get Server List');
  }
  return '';
};
