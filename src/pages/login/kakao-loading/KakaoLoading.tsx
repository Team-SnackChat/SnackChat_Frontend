import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import store, { RootStateType } from '../../../store/configureStore';
import { asyncGetToken } from '../../../store/reducers/getTokenReducer';
import { MAIN_COLOR_BASE } from '../../../assets/colors';

interface TokenResponseType {
  refresh: string;
  access: string;
  msg: string;
}

interface TokenType {
  email: string;
  nickname: string;
  user_id: number;
}

const KakaoLoadingDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MAIN_COLOR_BASE};
`;
// const COOKIE_TEST_URL = process.env.REACT_APP_COOKIE_TEST_URL;
// const testInstance = axios.create({
//   baseURL: 'https://carrotww.shop',
//   withCredentials: true,
// });

// const handleTest = async (code: string) => {
//   if (COOKIE_TEST_URL) {
//     const response = await testInstance.get('/users/test/');
//     console.dir(response);
//   }
// };

export default function KakaoLoading() {
  const location = useLocation();
  const KAKAO_AUTHORIZATION_CODE = location.search.split('=')[1];

  const accessTokenLog = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const refreshTokenLog = useSelector(
    (state: RootStateType) => state.getToken.refreshToken,
  );

  useEffect(() => {
    const accessTokenDetail = getTokenJson(accessTokenLog);
    const refreshTokenDetail = getTokenJson(refreshTokenLog);
    console.dir(`accessTokenDetail:${accessTokenDetail.nickname}`);
    console.dir(`refreshTokenDetail:${refreshTokenDetail.nickname}`);
  }, [accessTokenLog, refreshTokenLog]);

  useEffect(() => {
    const asyncGetTokenWrapper = async () => {
      console.log('tmpFunc');
      await store.dispatch(asyncGetToken(KAKAO_AUTHORIZATION_CODE));
    };

    asyncGetTokenWrapper().then((r) => console.log(r));
  }, [KAKAO_AUTHORIZATION_CODE]);

  const getTokenJson = (token: string | null): TokenType => {
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

  return <KakaoLoadingDiv />;
}
