import axios from 'axios';

const SNACKCHAT_API_URL = process.env.REACT_APP_SNACKCHAT_API_URL;
const SNACKCHAT_TEST_URL = process.env.REACT_APP_COOKIE_TEST_URL;

interface PostNewServerProps {
  token: string;
  serverName: string;
  serverProfile: any;
}

export const postNewServer = async (props: PostNewServerProps) => {
  try {
    console.log(props.serverProfile);
    console.log(typeof props.serverProfile);
    let serverProfile;
    const reader = new FileReader();
    reader.readAsDataURL(props.serverProfile);
    reader.onloadend = () => {
      serverProfile = reader.result;
    };
    console.log(serverProfile);
    console.log(typeof serverProfile);
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
