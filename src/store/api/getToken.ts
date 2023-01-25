import { postAuthorizationCode } from '../../services/snackchat-api';

interface GetTokenProps {
  authCode: string;
}

export const getToken = async (props: GetTokenProps) => {
  const postCodeToServer = async (code: string) => {
    const tmpResponse = await postAuthorizationCode({
      authorizationCode: code,
    });
    return tmpResponse;
  };
  const tokens = await postCodeToServer(props.authCode);
  return tokens;
};
