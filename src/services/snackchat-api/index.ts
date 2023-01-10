import axios from 'axios';

const SNACKCHAT_API_URL = process.env.REACT_APP_SNACKCHAT_API_URL;

interface PostAuthorizationCodeProps {
  authorizationCode: string;
}

export const postAuthorizationCode = async (
  props: PostAuthorizationCodeProps,
) => {
  try {
    if (SNACKCHAT_API_URL) {
      const response = await axios.post(SNACKCHAT_API_URL, {
        authorization_code: `${props.authorizationCode}`,
      });
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw new Error('Error occurred while posting authorization code');
  }
  return '';
};
