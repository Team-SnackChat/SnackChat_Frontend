import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import store from '../../../store/configureStore';
import { asyncGetToken } from '../../../store/reducers/getTokenReducer';
import { DefaultP } from '../../../assets/styles';
import { MAIN_COLOR_BASE } from '../../../assets/colors';
import { postAuthorizationCode } from '../../../services/snackchat-api';

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
  const dispatch = useDispatch();
  const location = useLocation();
  const KAKAO_AUTHORIZATION_CODE = location.search.split('=')[1];
  const tmp = '카카오 로딩을 기다리는 중입니다';
  // @ts-ignore
  const accessTokenLog = useSelector((state) => state.getToken.accessToken);
  // @ts-ignore
  const refreshTokenLog = useSelector((state) => state.getToken.refreshToken);

  useEffect(() => {
    console.log(`accessTokenLog:${accessTokenLog}`);
    console.log(`refreshTokenLog:${refreshTokenLog}`);
    const accessTokenDetail = getTokenJson(accessTokenLog);
    const refreshTokenDetail = getTokenJson(refreshTokenLog);
    console.dir(`accessTokenDetail:${accessTokenDetail.nickname}`);
    console.dir(`refreshTokenDetail:${refreshTokenDetail.nickname}`);
  }, [accessTokenLog, refreshTokenLog]);

  useEffect(() => {
    const tmpFunc = async () => {
      console.log('tmpFunc');
      await store.dispatch(asyncGetToken(KAKAO_AUTHORIZATION_CODE));
    };
    tmpFunc().then((r) => console.log(r));
  }, []);

  const getTokenJson = (token: string | null) => {
    if (token) {
      const tokenPayload = token
        .split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const payloadDecode = decodeURIComponent(
        atob(tokenPayload)
          .split('')
          .map((c) => {
            const tmp = `00${c.charCodeAt(0).toString(16)}`.slice(-2);
            return `%${tmp}`;
          })
          .join(''),
      );
      return JSON.parse(payloadDecode);
    }
    return null;
  };

  return (
    <KakaoLoadingDiv>
      <DefaultP>{tmp}</DefaultP>
      {/*<Button onClick={() => handleTest(KAKAO_AUTHORIZATION_CODE)}>*/}
      {/*  테스트*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  onClick={async () => {*/}
      {/*    const postCodeToServer = async (code: string) => {*/}
      {/*      const tmpResponse = await postAuthorizationCode({*/}
      {/*        authorizationCode: code,*/}
      {/*      });*/}
      {/*      return tmpResponse;*/}
      {/*    };*/}
      {/*    const response = await postCodeToServer(KAKAO_AUTHORIZATION_CODE);*/}
      {/*    const refreshToken = response.refresh*/}
      {/*      .split('.')[1]*/}
      {/*      .replace(/-/g, '+')*/}
      {/*      .replace(/_/g, '/');*/}
      {/*    const refreshJsonPayload = decodeURIComponent(*/}
      {/*      atob(refreshToken)*/}
      {/*        .split('')*/}
      {/*        .map((c) => {*/}
      {/*          const tmp = `00${c.charCodeAt(0).toString(16)}`.slice(-2);*/}
      {/*          return `%${tmp}`;*/}
      {/*        })*/}
      {/*        .join(''),*/}
      {/*    );*/}
      {/*    const accessToken = response.access*/}
      {/*      .split('.')[1]*/}
      {/*      .replace(/-/g, '+')*/}
      {/*      .replace(/_/g, '/');*/}
      {/*    const accessJsonPayload = decodeURIComponent(*/}
      {/*      atob(accessToken)*/}
      {/*        .split('')*/}
      {/*        .map((c) => {*/}
      {/*          const tmp = `00${c.charCodeAt(0).toString(16)}`.slice(-2);*/}
      {/*          return `%${tmp}`;*/}
      {/*        })*/}
      {/*        .join(''),*/}
      {/*    );*/}
      {/*    console.log(accessJsonPayload);*/}
      {/*    console.log(refreshJsonPayload);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  테스트2*/}
      {/*</Button>*/}
    </KakaoLoadingDiv>
  );
}
