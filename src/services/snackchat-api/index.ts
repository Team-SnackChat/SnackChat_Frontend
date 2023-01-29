import axios from 'axios';

const SNACKCHAT_API_URL = process.env.REACT_APP_SNACKCHAT_API_URL;
const SNACKCHAT_TEST_URL = process.env.REACT_APP_COOKIE_TEST_URL;

interface PostAuthorizationCodeProps {
  authorizationCode: string;
}

export const postAuthorizationCode = async (
  props: PostAuthorizationCodeProps,
) => {
  try {
    if (SNACKCHAT_API_URL) {
      const response = await axios.post(
        `${SNACKCHAT_API_URL}/users/login/kakao/token/`,
        {
          authorization_code: `${props.authorizationCode}`,
        },
        { withCredentials: true },
      );
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw new Error('Error occurred while posting authorization code');
  }
  return '';
};

export interface TokenResponseType {
  refresh: string;
  access: string;
  msg: string;
}

export interface TokenType {
  email: string;
  nickname: string;
  user_id: number;
}

export const parseToken = (token: string | null): TokenType => {
  if (token) {
    const tokenPayload = token
      .split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const payloadDecode = decodeURIComponent(
      window
        .atob(tokenPayload)
        .split('')
        .map((c) => {
          const tmp = `00${c.charCodeAt(0).toString(16)}`.slice(-2);
          return `%${tmp}`;
        })
        .join(''),
    );
    return JSON.parse(payloadDecode);
  }
  return { email: '', nickname: '', user_id: -1 };
};
